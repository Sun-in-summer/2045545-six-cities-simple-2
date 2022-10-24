import {Expose, Type}  from 'class-transformer';
import { City } from '../../../types/city.enum';
import { OfferType } from '../../../types/offerType.enum';
import UserResponse from '../../user/response/user.response';

export default class OfferResponse {
  @Expose()
  public id!:string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({name: 'createdAt'})
  public postDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public previewPath!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public roomQuantity!: number;

  @Expose()
  public guestsQuantity!: number;

  @Expose()
  public price!: number;

  @Expose()
  public accommodations!: string[];

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public userId!: UserResponse;

  @Expose()
  public commentsQuantity!: number;

  @Expose()
  public latitude!: number;

  @Expose()
  public longitude!: number;
}
