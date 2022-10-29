import { IsString, Length, IsMongoId, Min, Max, IsNumber } from 'class-validator';
import { MIN_TEXT, MAX_TEXT, MIN_RATING, MAX_RATING } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(MIN_TEXT, MAX_TEXT, {message: 'Min length of comment text is $constraint1, max is $constraint2'})
  public text!: string;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;


  public userId!: string;

  @IsNumber({}, { message: 'Rating is required' })
  @Min(MIN_RATING, { message: 'Minimum rating must be $constraint1' })
  @Max(MAX_RATING, { message: 'Maximum rating must be 5$constraint1' })
  public rating!: number;
}


