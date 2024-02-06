import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { Error as STError } from "supertokens-node";
import { VerifySessionOptions } from "supertokens-node/recipe/session";
import { verifySession } from "supertokens-node/recipe/session/framework/fastify";

export const Session = createParamDecorator<VerifySessionOptions>(
  async (
    verifySessionOptions: VerifySessionOptions,
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest();
    const response: FastifyReply = context.switchToHttp().getResponse();

    await verifySession(verifySessionOptions)(request, response);

    if (response.sent) {
      throw new STError({
        message: "RESPONSE_SENT",
        type: "RESPONSE_SENT",
      });
    }

    return request.session;
  },
);
