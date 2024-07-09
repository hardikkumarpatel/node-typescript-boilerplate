export interface IRequestEntityParams {
  event?: Event;
  user?: User;
}

declare global {
  namespace Express {
    interface Request {
      entity: IRequestEntityParams;
    }
  }
}
