import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { plugin } from "supertokens-node/framework/fastify/index.js";

import { AppModule } from "./app.module";
import { SupertokensExceptionFilter } from "./auth/auth.filter";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.register(plugin);

  app.useGlobalFilters(new SupertokensExceptionFilter());
  const configService = app.get(ConfigService);
  const port = configService.get<string>("PORT", "3000");
  await app.listen(port, "0.0.0.0");

  const logger = app.get(Logger);
  logger.log(`App is ready and listening on port ${port} 🚀`);
}

bootstrap();
