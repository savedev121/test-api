import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { Error as STError } from "supertokens-node";
import { VerifySessionOptions } from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/fastify";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly verifyOptions?: VerifySessionOptions) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();

    const resp = ctx.getResponse<FastifyReply>();
    const req = ctx.getRequest<FastifyRequest>();
    try {
      await verifySession(this.verifyOptions)(req, resp);
    } catch (err) {
      if (resp.sent) {
        throw new STError({
          message: "RESPONSE_SENT",
          type: "RESPONSE_SENT",
        });
      }
      throw err;
    }

    return true;
  }
}
