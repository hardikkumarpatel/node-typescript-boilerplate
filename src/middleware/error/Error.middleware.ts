import { Config } from "@/config";
import { ApiErrorResponseHelper, Log } from "@/helpers";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export default class ApiErrorHelperMiddleware {
  public static use = <T = string>(
    err: ApiErrorResponseHelper<T>,
    _: Request,
    res: Response,
    __: NextFunction
  ) => {
    const { message, name, error, stack } = err;
    let { statusCode } = err;
    if (!statusCode) {
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    }
    const errors = new ApiErrorResponseHelper<NonNullable<T> | string>(
      statusCode,
      message,
      error ?? name,
      stack
    );
    if (Config.isDev()) {
      Log.error<ApiErrorResponseHelper<NonNullable<T> | string>>("", errors);
    }
    const response = {
      ...errors,
      ...(Config.isDev() ? { stack } : {})
    };
    return res.status(statusCode).json(response);
  };
}
