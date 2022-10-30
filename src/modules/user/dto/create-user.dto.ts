import {IsBoolean, IsEmail, IsString, Length} from 'class-validator';
import { UserNameLength, PasswordLength} from '../../../const.js';
export default class CreateUserDto {
  @IsEmail()
  public email!: string ;


  @IsString({ message: 'Name is required' })
  @Length(UserNameLength.MIN, UserNameLength.MAX, { message: 'Min length is $constraint1, max is $constraint2' })
  public userName!: string;

  @IsBoolean()
  public isPro!: boolean;

  @IsString({ message: 'Password is required' })
  @Length(PasswordLength.MIN, PasswordLength.MAX, { message: 'Min password length is $constraint1, max is $constraint2' })
  public password!: string;
}
