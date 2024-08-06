import { getReasonPhrase, StatusCodes } from "http-status-codes";

export default class ApiErrorResponseHelper<T> extends Error {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public data: null;
  public error: T;
  constructor(
    statusCode = 500,
    message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    error: T,
    stack: string | null = null
  ) {
    super(message);
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

interface Extension {
  code?: string;
  stacktrace?: ReadonlyArray<string>;
}
export class ErrorCapture {
  public message: string;
  public extensions: Extension | undefined;
  constructor(message: string, extensions?: Extension) {
    (this.message = message), (this.extensions = extensions);
  }
}
