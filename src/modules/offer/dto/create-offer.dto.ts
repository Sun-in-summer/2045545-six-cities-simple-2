import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offerType.enum.js';
import {ArrayMinSize, ArrayMaxSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude, IsNumber, IsUrl } from 'class-validator';
import { Accommodation } from '../../../types/accommodation.enum.js';
import { TitleLength, DescriptionLength, RoomQuantity, GuestQuanity, Rating , Price , IMAGES_QUANTITY} from '../../../const.js';


export default class CreateOfferDto {
  @MinLength(TitleLength.MIN, {message: 'Minimum title length must be $constraint1, but actual is $value.'})
  @MaxLength(TitleLength.MAX, {message: 'Maximum title length must be $constraint1, but actual is $value.'})
  public title!: string;

  @MinLength(DescriptionLength.MIN, {message: 'Minimum description length must be $constraint1, but actual is $value.'})
  @MaxLength(DescriptionLength.MAX, {message: 'Maximum description length must be $constraint1, but actual is $value.'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @IsEnum(City, {message: 'City must be one from the follows: Paris, Cologne, Brussels, Amsterdam, Hamburg,Dusseldorf.'})
  public city!: City;


  @IsArray({message: `Field images must be an array of ${IMAGES_QUANTITY}`})
  @ArrayMinSize(IMAGES_QUANTITY)
  @ArrayMaxSize(IMAGES_QUANTITY)
  @IsUrl({ message: 'Url of images should be valid' }, { each: true })
  public images!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsNumber({maxDecimalPlaces: 1})
  @Min(Rating.MIN, { message: 'Minimum rating must be $constraint1' })
  @Max(Rating.MAX, { message: 'Maximum rating must be $constraint1' })
  public rating!: number;

  @IsEnum(OfferType, {message: 'Type must be Apartment, House, Room or Hotel'})
  public type!: OfferType;


  @IsInt({message: 'Room quantity must be an integer'})
  @Min(RoomQuantity.MIN, {message: 'Min rooms quantity is $constraint1'})
  @Max(RoomQuantity.MAX, {message: 'Max rooms quantity is $constraint1'})
  public roomQuantity!: number;

  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(GuestQuanity.MIN, {message: 'Min guests quantity is $constraint1'})
  @Max(GuestQuanity.MAX, {message: 'Max guests quantity is $constraint1'})
  public guestsQuantity!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(Price.MIN, {message: 'Minimum price is $constraint1'})
  @Max(Price.MAX, {message: 'Maximum price is $constraint1'})
  public price!: number;

  @IsArray()
  @IsEnum(Accommodation, {each: true, message: 'Accomodations field must be filled from available values'})
  public accommodations!: Accommodation[];

  public userId!: string;


  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

