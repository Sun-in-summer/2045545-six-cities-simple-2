import {Expose, Type}  from 'class-transformer';
import { Accommodation } from '../../../types/accommodation.enum.js';
import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offerType.enum.js';
import UserResponse from '../../user/response/user.response.js';

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
  public accommodations!: Accommodation[];

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
