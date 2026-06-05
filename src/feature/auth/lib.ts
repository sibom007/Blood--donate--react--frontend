
import { config } from "@/lib/config";
import axios from "axios";
import type { BloodTypeValues, TJwtUser } from "./types";

export const getNewAccessToken = async () => {
  const response = await axios.post(
    `${config.backendUrl}/auth/refresh-token`,
    {},
    { withCredentials: true },
  );
  const newToken: string = response?.data?.data.accessToken;
  const user: TJwtUser = response?.data?.data.user;

  return { accessToken: newToken, user };
};

export const Logout = async () => {
  const response = await axios.post(
    `${config.backendUrl}/auth/logout`,
    {},
    { withCredentials: true },
  );

  return { status: response.data.data };
};

/**
 * Maps "A_POSITIVE" -> "A+" or "AB_NEGATIVE" -> "AB-"
 */
export const getBloodTypeLabel = (type?: BloodTypeValues): string => {
  if (!type) return "";

  const [group, rh] = type.split("_");
  return `${group}${rh === "POS" ? "+" : "-"}`;
};
