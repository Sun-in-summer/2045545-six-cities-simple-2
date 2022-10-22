import {Expose, Type}  from 'class-transformer';
import UserResponse from '../../user/response/user.response';


export default class CommentResponse {
  @Expose()
  public text!: string;

  @Expose()
  public offerId!: string;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public userId!: UserResponse;

  @Expose()
  public rating!: number;

}
