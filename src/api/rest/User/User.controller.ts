import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiAsyncHelper, ApiResponseHelper } from "@/helpers";
import UserService from "@/api/rest/User/User.service";
import { IUser } from "@/helpers/interfaces/User.definations";

class UserController {
  public static getUsers = ApiAsyncHelper.AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const users: IUser[] = await UserService.getUsersDetails();
      res
        .status(StatusCodes.OK)
        .send(
          new ApiResponseHelper<Record<string, IUser[]>>(
            StatusCodes.OK,
            "Users details fetch successfully",
            { users }
          )
        );
    }
  );
}

export default UserController;
