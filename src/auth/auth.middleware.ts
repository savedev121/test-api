import { Injectable, NestMiddleware } from "@nestjs/common";

// import { middleware } from "supertokens-node/framework/fastify";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supertokensMiddleware: any;

  constructor() {
    // this.supertokensMiddleware = middleware();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.supertokensMiddleware = (request: any, rest: any, next: () => any) =>
      next();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use(request: Request, response: any, next: () => void) {
    return this.supertokensMiddleware(request, response, next);
  }
}
