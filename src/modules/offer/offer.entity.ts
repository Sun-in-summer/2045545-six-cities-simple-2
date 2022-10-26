
import typegoose, {getModelForClass, defaultClasses, Ref} from '@typegoose/typegoose';
import { OfferType  } from '../../types/offerType.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { TitleLength, DescriptionLength, Rating,  RoomQuantity, GuestQuanity, Price } from '../../const.js';
import { City } from '../../types/city.enum.js';
import { Accommodation } from '../../types/accommodation.enum.js';


const {prop, modelOptions} = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  },
})

export class OfferEntity extends defaultClasses.TimeStamps  {
  @prop({
    trim: true,
    required: true,
    minlength: [TitleLength.MIN,
      `Min length for title is ${TitleLength.MIN}`],
    maxLength: [TitleLength.MAX,
      `Max length for title is ${TitleLength.MAX}`]
  })
  public title!: string;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    trim: true,
    required: true,
    minlength: [DescriptionLength.MIN,
      `Min length for description is ${DescriptionLength.MIN}`],
    maxLength: [DescriptionLength.MAX,
      `Max length for description is ${DescriptionLength.MAX}`]
  })
  public description!: string;

  @prop({
    required: true,
  })
  public postDate!: Date;

  @prop({
    required: true,
    type: () => String,
    enum: City,
  })
  public city!: City;

  @prop({
    required: true,
  })
  public previewPath!: string;

  @prop({
    required: true,
    type: () => [String],
  })
  public images!: string[];

  @prop({
    required: true,
    default: false
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    min: [Rating.MIN, `Min rating: ${Rating.MIN}`],
    max: [Rating.MAX, `Max rating: ${Rating.MAX}`],
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => String,
    enum: OfferType,
  })
  public type!: OfferType;

  @prop({
    required: true,
    min: [RoomQuantity.MIN, `Min room quantity: ${RoomQuantity.MIN}`],
    max: [RoomQuantity.MAX, `Max room quantity: ${RoomQuantity.MAX}`],
  })
  public roomQuantity!: number;

  @prop({
    required: true,
    min: [GuestQuanity.MIN, `Min guests quantity: ${GuestQuanity.MIN}`],
    max: [GuestQuanity.MAX, `Max guests quantity: ${GuestQuanity.MAX}`],
  })
  public guestsQuantity!: number;

  @prop({
    required: true,
    min: [Price.MIN, `Min price: ${Price.MIN}`],
    max: [Price.MAX, `Max price: ${Price.MAX}`],
  })
  public price!: number;

  @prop({
    required: true,
    type: String,
    enum: Accommodation,
    default: []
  })
  public accommodations!: Accommodation[];////


  @prop({
    default: 0
  })
  public commentsQuantity!: number;

  @prop()
  public latitude!: number;

  @prop()
  public longitude!: number;

}

export const OfferModel = getModelForClass(OfferEntity);

