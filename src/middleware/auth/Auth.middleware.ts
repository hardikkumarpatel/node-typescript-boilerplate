import { ApiAsyncHelper, ApiErrorResponseHelper } from "@/helpers";
import { IUser } from "@/helpers/interfaces/User.definations";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

class ApiAuthHelperMiddleware {
  public static use = ApiAsyncHelper.AsyncHandler(async (req, res, next): Promise<void> => {
    const { headers } = req;
    if (!headers.authorization?.includes("Bearer")) {
      throw new ApiErrorResponseHelper<string>(
        StatusCodes.UNAUTHORIZED,
        "Unauthorised request! access token is missing",
        getReasonPhrase(StatusCodes.UNAUTHORIZED)
      );
    }

    const user: IUser = {
      name: "Hardy",
      email: "info@mail.com"
    };
    req.entity.user = user;
    next();
  });
}

export default ApiAuthHelperMiddleware;
