export {};

declare global {
  namespace Express {
    interface Response {
      send: string;
    }
    interface Request {}
  }
}
