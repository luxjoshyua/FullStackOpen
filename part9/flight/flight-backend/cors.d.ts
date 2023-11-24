declare module "cors" {
  import { RequestHandler } from "express";

  const allowedOrigins = "http://localhost:5173/";

  interface CorsOptions {
    origin: typeof allowedOrigins;
  }

  function cors(options?: CorsOptions): RequestHandler;

  export = cors;
}
