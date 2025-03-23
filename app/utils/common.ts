import crypto from "crypto";

export const generateRandomString = (length = 16) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};
