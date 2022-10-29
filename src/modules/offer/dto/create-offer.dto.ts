import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offerType.enum.js';
import {ArrayMinSize, ArrayMaxSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude, IsNumber, IsUrl } from 'class-validator';
import { Accommodation } from '../../../types/accommodation.enum.js';
import {MIN_TITLE, MAX_TITLE, MIN_DESCRIPTION , MAX_DESCRIPTION , MAX_PATH_LENGH ,IMAGES_QUANTITY , MIN_RATING ,MAX_RATING ,MIN_ROOM_QTY ,MAX_ROOM_QTY , MIN_GUESTS_QTY , MAX_GUESTS_QTY, MIN_PRICE  , MAX_PRICE } from '../offer.constant.js';


export default class CreateOfferDto {
  @MinLength(MIN_TITLE, {message: 'Minimum title length must be $constraint1, but actual is $value.'})
  @MaxLength(MAX_TITLE, {message: 'Maximum title length must be $constraint1, but actual is $value.'})
  public title!: string;

  @MinLength(MIN_DESCRIPTION, {message: 'Minimum description length must be $constraint1, but actual is $value.'})
  @MaxLength(MAX_DESCRIPTION, {message: 'Maximum description length must be $constraint1, but actual is $value.'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @IsEnum(City, {message: 'City must be one from the follows: Paris, Cologne, Brussels, Amsterdam, Hamburg,Dusseldorf.'})
  public city!: City;

  @MaxLength(MAX_PATH_LENGH, {message: 'Too long for the field "previewImage"'})
  @IsUrl({ message: 'Preview url should be valid' })
  public previewPath!: string;

  @IsArray({message: `Field images must be an array of ${IMAGES_QUANTITY}`})
  @ArrayMinSize(IMAGES_QUANTITY)
  @ArrayMaxSize(IMAGES_QUANTITY)
  @IsUrl({ message: 'Url of images should be valid' }, { each: true })
  public images!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsNumber({maxDecimalPlaces: 1})
  @Min(MIN_RATING, { message: 'Minimum rating must be $constraint1' })
  @Max(MAX_RATING, { message: 'Maximum rating must be $constraint1' })
  public rating!: number;

  @IsEnum(OfferType, {message: 'Type must be Apartment, House, Room or Hotel'})
  public type!: OfferType;


  @IsInt({message: 'Room quantity must be an integer'})
  @Min(MIN_ROOM_QTY, {message: 'Min rooms quantity is $constraint1'})
  @Max(MAX_ROOM_QTY, {message: 'Max rooms quantity is $constraint1'})
  public roomQuantity!: number;

  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(MIN_GUESTS_QTY, {message: 'Min guests quantity is $constraint1'})
  @Max(MAX_GUESTS_QTY, {message: 'Max guests quantity is $constraint1'})
  public guestsQuantity!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(MIN_PRICE, {message: 'Minimum price is $constraint1'})
  @Max(MAX_PRICE, {message: 'Maximum price is $constraint1'})
  public price!: number;

  @IsArray()
  @IsEnum(Accommodation, {each: true, message: 'Accomodations field must be filled from available values'})
  public accommodations!: Accommodation[];

  public userId!: string;


  @IsInt({message: 'Comments quantity must be an integer'})
  public commentsQuantity!: number;

  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

