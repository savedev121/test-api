import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    LoggerModule,
    HealthModule,
    AuthModule.forRoot({
      connectionURI: process.env.SUPERTOKEN_URI || "",
      apiKey: process.env.SUPERTOKNE_APIKEY || "",
      appInfo: {
        apiDomain: process.env.SUPERTOKEN_API_DOMAIN || "",
        appName: process.env.SUPERTOKEN_APPNAME || "app",
        websiteDomain: process.env.SUPERTOKEN_WEBSITE || "",
        apiBasePath: process.env.SUPERTOKEN_APIBASEPATCH || "",
        websiteBasePath: process.env.SUPERTOKEN_WEBSITEBASEPATH || "",
      },
    }),
  ],
})
export class AppModule {}
