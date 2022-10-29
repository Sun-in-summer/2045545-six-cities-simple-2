import { IsString, Length, IsMongoId, Min, Max, IsNumber } from 'class-validator';
import {CommentTextLength, Rating  } from '../../../const.js';


export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(CommentTextLength.MIN, CommentTextLength.MAX, {message: 'Min length of comment text is $constraint1, max is $constraint2'})
  public text!: string;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;


  public userId!: string;

  @IsNumber({}, { message: 'Rating is required' })
  @Min(Rating.MIN, { message: 'Minimum rating must be $constraint1' })
  @Max(Rating.MAX, { message: 'Maximum rating must be 5$constraint1' })
  public rating!: number;
}


