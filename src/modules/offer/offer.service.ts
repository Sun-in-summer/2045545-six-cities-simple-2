import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { Component } from '../../types/component.types.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { SortType } from '../../types/sort-type.enum.js';


@injectable()
export default class OfferService implements OfferServiceInterface {

  constructor(
    @inject(Component.LoggerInterface)
    private readonly logger: LoggerInterface,

    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,


  ) {}

  public async create(dto: CreateOfferDto): Promise <DocumentType<OfferEntity>> {

    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created:  ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return  this.offerModel
      .findById(offerId)
      .populate('userId')
      .exec();

  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]>{
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find()
      .populate('userId')
      .limit(limit)
      .sort({postDate: SortType.Down})
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>{
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate('userId')
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId}))!==null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc':{commentsQuantity: 1,}}).exec();
  }

  public async getOfferRatingById(offerId: string): Promise< number| null> {
    const averageRating =  await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comments',

            pipeline: [
              { $match:
                {
                  _id: offerId,
                }
              },
              { $project :{_id: 1, rating: 1}},
            ],
            as: 'ratings'
          },
        },
        { $addFields:
            { id: { $toString: '$_id'},
              commentsCount: { $size: '$ratings'} ,
              avgRating: { $avg: '$rating' }}
        },
        { $unset: 'ratings' },
      ]).exec();

    return averageRating[0].avgRating;


  }
}


