import { ApiAsyncHelper, ApiErrorResponseHelper, PermissionsHelper } from "@/helpers";
import { StatusCodes } from "http-status-codes";

class ApiRoleHelperMiddleware {
  public static role = (permission: string) =>
    ApiAsyncHelper.AsyncHandler(async (req, res, next) => {
      const role = req.entity.user ? "bold" : "ANONYMOUES";
      const permissions = await new PermissionsHelper().getPermissionsByRoleName(role);
      if (permissions.includes(permission)) {
        return next();
      }
      return res
        .status(StatusCodes.FORBIDDEN)
        .send(
          new ApiErrorResponseHelper(
            StatusCodes.ACCEPTED,
            "Access denied! you don't have permission to access this route",
            null
          )
        );
    });
}

export default ApiRoleHelperMiddleware;
