import { IUser } from "@/api/user/User.defination";

export interface IRequestEntityParams {
  user?: IUser;
}

declare global {
  namespace Express {
    interface Request {
      entity: IRequestEntityParams;
    }
  }
}
