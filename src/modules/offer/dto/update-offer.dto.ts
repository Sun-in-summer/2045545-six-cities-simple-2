import { Accommodation } from '../../../types/accommodation.enum.js';
import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offerType.enum.js';
import {ArrayMinSize, ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude, IsUrl, IsOptional} from 'class-validator';
import {MIN_TITLE, MAX_TITLE, MIN_DESCRIPTION , MAX_DESCRIPTION , MAX_PATH_LENGH ,IMAGES_QUANTITY , MIN_ROOM_QTY ,MAX_ROOM_QTY , MIN_GUESTS_QTY , MAX_GUESTS_QTY, MIN_PRICE  , MAX_PRICE } from '../offer.constant.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(MIN_TITLE, {message: 'Minimum title length must be $constraint1, but actual is $value.'})
  @MaxLength(MAX_TITLE, {message: 'Maximum title length must be $constraint1, but actual is $value.'})
  public title!: string;

  @IsOptional()
  @MinLength(MIN_DESCRIPTION, {message: 'Minimum description length must be 20, but actual is $value.'})
  @MaxLength(MAX_DESCRIPTION, {message: 'Maximum description length must be 1024, but actual is $value.'})
  public description!: string;

  @IsOptional()
  @IsEnum(City, {message: 'City must be one from the follows: Paris, Cologne, Brussels, Amsterdam, Hamburg,Dusseldorf.'})
  public city!: City;

  @IsOptional()
  @MaxLength(MAX_PATH_LENGH, {message: 'Too long for the field "previewImage"'})
  @IsUrl({ message: 'Preview url should be valid' })
  public previewPath!: string;

  @IsOptional()
  @IsArray({message: `Field images must be an array of ${IMAGES_QUANTITY}`})
  @ArrayMinSize(IMAGES_QUANTITY)
  @ArrayMaxSize(IMAGES_QUANTITY)
  @IsUrl({ message: 'Url of images should be valid' }, { each: true })
  public images!: string[];

  @IsOptional()
  @IsBoolean()
  public isPremium!: boolean;

  @IsOptional()
  @IsEnum(OfferType, {message: 'Type must be Apartment, House, Room or Hotel'})
  public type!: OfferType;

  @IsOptional()
  @IsInt({message: 'Room quantity must be an integer'})
  @Min(MIN_ROOM_QTY, {message: 'Min rooms quantity is $constraint1'})
  @Max(MAX_ROOM_QTY, {message: 'Max rooms quantity is $constraint1'})
  public roomQuantity!: number;

  @IsOptional()
  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(MIN_GUESTS_QTY, {message: 'Min guests quantity is $constraint1'})
  @Max(MAX_GUESTS_QTY, {message: 'Max guests quantity is $constraint1'})
  public guestsQuantity!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(MIN_PRICE, {message: 'Minimum price is $constraint1'})
  @Max(MAX_PRICE, {message: 'Maximum price is $constraint1'})
  public price!: number;

  @IsOptional()
  @IsArray()
  @IsEnum(Accommodation, {each: true, message: 'Accomodations must be an array from available values'})
  public accommodations!: Accommodation[];

  @IsOptional()
  @IsLatitude()
  public latitude!: number;

  @IsOptional()
  @IsLongitude()
  public longitude!: number;
}

