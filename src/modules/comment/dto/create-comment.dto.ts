import { IsString, Length, IsMongoId, Min, Max, IsNumber } from 'class-validator';

export default class CreateCommentDto {
  @IsString({message: 'text is required'})
  @Length(5, 1024, {message: 'Min length is 5, max is 1024'})
  public text!: string;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;


  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;

  @IsNumber({}, { message: 'Rating is required' })
  @Min(1, { message: 'Minimum rating must be 1' })
  @Max(5, { message: 'Maximum rating must be 5' })
  public rating!: number;
}


