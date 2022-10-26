import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offerType.enum.js';
import {ArrayMinSize, ArrayMaxSize, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsMongoId, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude, IsNumber, IsUrl} from 'class-validator';
import { Accommodation } from '../../../types/accommodation.enum.js';


export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be $constraint1, but actual is $value.'})
  @MaxLength(100, {message: 'Maximum title length must be $constraint1, but actual is $value.'})
  public title!: string;

  @MinLength(20, {message: 'Minimum description length must be 20, but actual is $value.'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024, but actual is $value.'})
  public description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
  public postDate!: Date;

  @IsEnum(City, {message: 'City must be one from the follows: Paris, Cologne, Brussels, Amsterdam, Hamburg,Dusseldorf.'})
  public city!: City;

  @MaxLength(256, {message: 'Too long for the field "previewImage"'})
  @IsUrl({ message: 'Preview url should be valid' })
  public previewPath!: string;

  @IsArray({message: 'Field images must be an array of 6'})
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @IsUrl({ message: 'Url of images should be valid' }, { each: true })
  public images!: string[];

  @IsBoolean()
  public isPremium!: boolean;

  @IsNumber()
  @Min(1, { message: 'Minimum rating must be 1' })
  @Max(5, { message: 'Maximum rating must be 5' })
  public rating!: number;

  @IsEnum(OfferType, {message: 'Type must be Apartment, House, Room or Hotel'})
  public type!: OfferType;


  @IsInt({message: 'Room quantity must be an integer'})
  @Min(1, {message: 'Min rooms quantity is 1'})
  @Max(8, {message: 'Max rooms quantity is 8'})
  public roomQuantity!: number;

  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(1, {message: 'Min guests quantity is 1'})
  @Max(10, {message: 'Max guests quantity is 10'})
  public guestsQuantity!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
  public price!: number;

  @IsArray()
  @IsEnum(Accommodation, {each: true, message: 'Categories field must be an array of valid id'})
  public accommodations!: Accommodation[];////

  @IsMongoId({message: 'userId field must be valid an id'})
  public userId!: string;


  @IsInt({message: 'Price must be an integer'})
  public commentsQuantity!: number;

  @IsLatitude()
  public latitude!: number;

  @IsLongitude()
  public longitude!: number;
}

