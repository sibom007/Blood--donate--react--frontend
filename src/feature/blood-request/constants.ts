import z from "zod";

export type RequestStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "MATCHING"
  | "FULFILLED"
  | "CANCELLED"
  | "EXPIRED";

// 1. Define the Enums in Zod
export const BloodGroupSchema = z.enum([
  "A_POS",
  "A_NEG",
  "B_POS",
  "B_NEG",
  "AB_POS",
  "AB_NEG",
  "O_POS",
  "O_NEG",
]);

export const UrgencySchema = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);

export const RequestStatusSchema = z.enum([
  "PENDING",
  "IN_PROGRESS",
  "MATCHING",
  "FULFILLED",
  "CANCELLED",
  "EXPIRED",
]);

// 2. Extract TypeScript Types from the schemas
export type TBloodGroup = z.infer<typeof BloodGroupSchema>;
export type TUrgency = z.infer<typeof UrgencySchema>;
export type TRequestStatus = z.infer<typeof RequestStatusSchema>;

export const BLOOD_GROUP_LABELS: Record<TBloodGroup, string> = {
  A_POS: "A+",
  A_NEG: "A-",
  B_POS: "B+",
  B_NEG: "B-",
  AB_POS: "AB+",
  AB_NEG: "AB-",
  O_POS: "O+",
  O_NEG: "O-",
};

export const STATUS_LABELS: Record<RequestStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  MATCHING: "Finding Donors",
  FULFILLED: "Fulfilled",
  CANCELLED: "Cancelled",
  EXPIRED: "Expired",
};

export const URGENCY_LABELS: Record<TUrgency, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};
