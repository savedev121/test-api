import { AppInfo } from "supertokens-node/lib/build/types";

export type AuthModuleConfig = {
  appInfo: AppInfo;
  connectionURI: string;
  apiKey?: string;
};
