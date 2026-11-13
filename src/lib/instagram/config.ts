import "server-only";
import { InstagramError } from "./model";

export type InstagramConfig = {
  accountId: string;
  authMode: "instagram-login" | "system-user";
  graphVersion: string;
  bootstrapToken: string;
  bootstrapExpiresAt: string | null;
  publicStoreId: string;
  privateStoreId: string;
  publicBlobToken?: string;
  privateBlobToken?: string;
};

export function readInstagramConfig(): InstagramConfig | null {
  const env = process.env;
  const accountId = env.INSTAGRAM_ACCOUNT_ID;
  const bootstrapToken = env.INSTAGRAM_ACCESS_TOKEN;
  const publicStoreId = env.INSTAGRAM_PUBLIC_BLOB_STORE_ID;
  const privateStoreId = env.INSTAGRAM_PRIVATE_BLOB_STORE_ID;
  if (!accountId || !bootstrapToken || !publicStoreId || !privateStoreId) return null;

  const authMode = env.INSTAGRAM_AUTH_MODE || "instagram-login";
  const graphVersion = env.INSTAGRAM_GRAPH_VERSION || "v27.0";
  const bootstrapExpiresAt = env.INSTAGRAM_TOKEN_EXPIRES_AT || null;
  if (
    !/^\d+$/.test(accountId) ||
    !/^v\d+\.0$/.test(graphVersion) ||
    !["instagram-login", "system-user"].includes(authMode) ||
    publicStoreId.replace(/^store_/, "") === privateStoreId.replace(/^store_/, "") ||
    (authMode === "instagram-login" && !bootstrapExpiresAt) ||
    (bootstrapExpiresAt !== null && !Number.isFinite(Date.parse(bootstrapExpiresAt)))
  ) {
    throw new InstagramError("invalid_configuration");
  }
  return {
    accountId,
    authMode: authMode as InstagramConfig["authMode"],
    graphVersion,
    bootstrapToken,
    bootstrapExpiresAt,
    publicStoreId,
    privateStoreId,
    publicBlobToken: env.INSTAGRAM_PUBLIC_BLOB_READ_WRITE_TOKEN,
    privateBlobToken: env.INSTAGRAM_PRIVATE_BLOB_READ_WRITE_TOKEN,
  };
}
