/*
 * @format
 */
import crypto from "crypto";
import jwt from "jsonwebtoken";
import "src/lib/loadEnv";
import { IAttributes } from "src/entities";

const { SECRET_KEY } = process.env;
const encryptionKey = crypto.scryptSync(SECRET_KEY, "salt", 24);
const ALGORITHM = "aes-192-cbc";

export const encrypt = (
  data: string
): { encrypted: string; ivString: string } => {
  // Use `crypto.randomBytes` to generate a random iv instead of the static iv
  // shown here.
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(ALGORITHM, encryptionKey, iv);

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return { encrypted, ivString: iv.toString("hex") };
};

export const decrypt = (params: {
  ivString: string;
  encrypted: string;
}): string => {
  const { ivString, encrypted } = params;
  const iv = Buffer.from(ivString, "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, encryptionKey, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

export const getJWT = (payload: IAttributes): string =>
  jwt.sign(payload, SECRET_KEY);

export const verifyJWT = (token: string): IAttributes | string =>
  jwt.verify(token, SECRET_KEY);

export const getHash = (data: string): string =>
  crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");

export const compareHash = (data: string, encryptedData: string): boolean =>
  getHash(data) === encryptedData;
