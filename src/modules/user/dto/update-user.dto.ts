import { IsOptional, IsString, Length } from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Avatar path must be correct' })
  public avatarPath?: string;

  @IsOptional()
  @IsString({ message: 'Name is required' })
  @Length(1, 15, { message: 'Min length is 1, max is 15' })
  public userName?: string;
}
