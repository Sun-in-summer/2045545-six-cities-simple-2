import { User } from '../../types/user.type.js';
import typegoose, {getModelForClass, defaultClasses} from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/common.js';
import { UserNameLength, EMAIL_REG_EXP, AVATAR_PATH_REG_EXP } from '../../const.js';

const {prop, modelOptions} =typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  constructor (data: User) {
    super();

    this.email = data.email;
    this.avatarPath = data.avatarPath;
    this.userName = data.userName;
    this.isPro = data.isPro;
  }

  @prop({
    unique: true,
    required: true,
    match: [EMAIL_REG_EXP, 'Email is incorrect']
  })
  public email!: string;

  @prop({
    match: [AVATAR_PATH_REG_EXP, 'Avatar path or format is incorrect ']
  })
  public avatarPath!: string;

  @prop({
    required: true,
    default:'',
    minLength: [UserNameLength.MIN,
      `Min length for name is ${UserNameLength.MIN}`],
    maxLength: [UserNameLength.MAX,
      `Max length for name is ${UserNameLength.MAX}`]})
  public userName!: string;

  @prop({required: true, default: false})
  public isPro!: boolean;

  @prop({
    required: true,
  })
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

}

export const UserModel = getModelForClass(UserEntity);
