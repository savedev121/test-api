import { Inject, Injectable } from "@nestjs/common";
import { AUTH_MODULE_CONFIG_PROVIDER } from "@src/auth/auth.constants";
import { AuthModuleConfig } from "@src/auth/auth-module-config.interface";
import supertokens from "supertokens-node/lib/build/supertokens";
import Session from "supertokens-node/recipe/session";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword";

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(AUTH_MODULE_CONFIG_PROVIDER)
    private readonly config: AuthModuleConfig,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [ThirdPartyEmailPassword.init(), Session.init()],
    });
  }
}
