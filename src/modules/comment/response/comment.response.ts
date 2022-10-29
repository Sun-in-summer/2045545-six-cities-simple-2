import {Expose, Type}  from 'class-transformer';
import UserResponse from '../../user/response/user.response.js';


export default class CommentResponse {
  @Expose()
  public text!: string;

  @Expose({name: 'createdAt'})
  public postDate!: Date;

  @Expose({name: 'userId'})
  @Type(() => UserResponse)
  public userId!: UserResponse;

  @Expose()
  public rating!: number;

}
