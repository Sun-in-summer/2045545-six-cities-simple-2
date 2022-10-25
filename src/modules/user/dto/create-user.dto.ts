import {IsBoolean, IsEmail, IsString, Length} from 'class-validator';
export default class CreateUserDto {
  @IsEmail()
  public email!: string ;

  @IsString({ message: 'Avatar path must be correct' })
  public avatarPath!: string;

  @IsString({ message: 'Name is required' })
  @Length(1, 15, { message: 'Min length is 1, max is 15' })
  public userName!: string;

  @IsBoolean()
  public isPro!: boolean;

  @IsString({ message: 'Password is required' })
  @Length(6, 12, { message: 'Min password length is 6, max is 12' })
  public password!: string;
}
