import { userType } from "./userType.enum.js";


export type User ={
  name: string;
  email:string;
  avatarPath: string;
  password: string;
  type: userType;
}
