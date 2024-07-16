export default class ApiResponseHelper<T> {
  public success: boolean;
  public statusCode: number;
  public message: string;
  public error: null;
  public data: T;
  constructor(statusCode = 200, message = "Success", data: T) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.error = null;
    this.data = data;
  }
}
