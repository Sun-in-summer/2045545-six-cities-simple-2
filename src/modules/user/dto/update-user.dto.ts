import { IsOptional, IsString, Length } from 'class-validator';
import { UserNameLength } from '../../../const.js';

export default class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Avatar path must be correct' })
  public avatarPath?: string;

  @IsOptional()
  @IsString({ message: 'Name is required' })
  @Length(UserNameLength.MIN, UserNameLength.MAX, { message: 'Min length is $constraint1, max is $constraint2' })
  public userName?: string;
}
