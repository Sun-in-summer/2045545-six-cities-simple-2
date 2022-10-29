import {IsEmail, IsString, Length} from 'class-validator';
import { PasswordLength} from '../../../const.js';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be a valid address'})
  public email!: string ;

  @IsString({message: 'password is required'})
  @Length(PasswordLength.MIN, PasswordLength.MAX, { message: 'Min password length is $constraint1, max is $constraint2' })
  public password!: string;
}
