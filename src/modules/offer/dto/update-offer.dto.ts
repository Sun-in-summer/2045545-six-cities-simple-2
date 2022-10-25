import { Accommodation } from '../../../types/accommodation.enum.js';
import { City } from '../../../types/city.enum.js';
import { OfferType } from '../../../types/offerType.enum.js';
import {ArrayMinSize, ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsInt, Max, MaxLength, Min, MinLength, IsLatitude, IsLongitude, IsUrl, IsOptional} from 'class-validator';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: 'Minimum title length must be $constraint1, but actual is $value.'})
  @MaxLength(100, {message: 'Maximum title length must be $constraint1, but actual is $value.'})
  public title!: string;

  @IsOptional()
  @MinLength(20, {message: 'Minimum description length must be 20, but actual is $value.'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024, but actual is $value.'})
  public description!: string;

  @IsOptional()
  @IsEnum(City, {message: 'City must be one from the follows: Paris, Cologne, Brussels, Amsterdam, Hamburg,Dusseldorf.'})
  public city!: City;

  @IsOptional()
  @MaxLength(256, {message: 'Too long for the field "previewImage"'})
  @IsUrl({ message: 'Preview url should be valid' })
  public previewPath!: string;

  @IsOptional()
  @IsArray({message: 'Field images must be an array of 6'})
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
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
  @Min(1, {message: 'Min rooms quantity is 1'})
  @Max(8, {message: 'Max rooms quantity is 8'})
  public roomQuantity!: number;

  @IsOptional()
  @IsInt({message: 'Guests quantity must be an integer'})
  @Min(1, {message: 'Min guests quantity is 1'})
  @Max(10, {message: 'Max guests quantity is 10'})
  public guestsQuantity!: number;

  @IsInt({message: 'Price must be an integer'})
  @Min(100, {message: 'Minimum price is 100'})
  @Max(100000, {message: 'Maximum price is 100000'})
  public price!: number;

  @IsOptional()
  @IsArray()
  @IsEnum(Accommodation, {each: true, message: 'Categories field must be an array of valid id'})
  public accommodations!: Accommodation[];

  @IsOptional()
  @IsLatitude()
  public latitude!: number;

  @IsOptional()
  @IsLongitude()
  public longitude!: number;
}

