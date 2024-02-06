import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from "@nestjs/common";

import { AUTH_MODULE_CONFIG_PROVIDER } from "./auth.constants";
import { AuthMiddleware } from "./auth.middleware";
import { AuthModuleConfig } from "./auth-module-config.interface";
import { SupertokensService } from "./supertokens.service";

@Module({})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }

  static forRoot({
    connectionURI,
    apiKey,
    appInfo,
  }: AuthModuleConfig): DynamicModule {
    const configProvider: Provider = {
      useValue: { appInfo, connectionURI, apiKey } as AuthModuleConfig,
      provide: AUTH_MODULE_CONFIG_PROVIDER,
    };
    return {
      providers: [configProvider, SupertokensService],
      exports: [SupertokensService],
      imports: [],
      module: AuthModule,
    };
  }
}
