import type { BloodGroup, Gender } from "@/feature/auth/types";

export type ApiError = {
  message?: string;
  err?: {
    message?: string;
    statusCode?: number;
  };
  errorSources?: {
    message?: string;
  }[];
};

export type user = {
  id: string;

  // Basic Info
  fullName: string;
  email: string;
  phone: string;

  // Profile
  gender: Gender | null;
  age: number | null;
  bloodGroup: BloodGroup;
  address: string | null;
  city: string | null;
  district: string | null;
  profileImage: string | null;
  bio: string | null;
  dateOfbirth: Date | null;

  // Donor Info
  isDonor: boolean;
  availability: boolean;
  weight: number | null;
  lastDonationDate: Date | null;

  // Account
  role: Role;
  status: UserStatus;
  emailVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
};

export interface bloodRequest {
  id: string;
  requesterId: string;
  donorId: string | null;
  inventoryId: string | null;
  patientName: string;
  patientAge: number | null;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  hospitalName: string;
  hospitalAddress: string;
  contactPerson: string;
  contactPhone: string;
  reason: string | null;
  requiredDate: Date;
  status: RequestStatus;
  donor?: user | null;
  requester?: user | null;
  createdAt: Date;
  updatedAt: Date;
}

export type inventory = {
  id: string;
  bloodGroup: BloodGroup;
  bagNumber: string;
  quantityML: number;
  donorName: string | null;
  donorId: string | null;
  collectionDate: Date;
  expiryDate: Date;
  testStatus: TestStatus;
  hivTest: TestResult;
  hepatitisBTest: TestResult;
  hepatitisCTest: TestResult;
  malariaTest: TestResult;
  syphilisTest: TestResult;
  isAvailable: boolean;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};


export type Role = "USER" | "OPERATOR" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED";
export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";
export type TestStatus = "PENDING" | "TESTED" | "FAILED";
export type TestResult = "PENDING" | "NEGATIVE" | "POSITIVE";

// 2. Runtime String Maps
export const ROLE: Record<Role, string> = {
  USER: "USER",
  OPERATOR: "OPERATOR",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export const USER_STATUS: Record<UserStatus, string> = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
  SUSPENDED: "SUSPENDED",
} as const;

export const REQUEST_STATUS: Record<RequestStatus, string> = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const TEST_STATUS: Record<TestStatus, string> = {
  PENDING: "PENDING",
  TESTED: "TESTED",
  FAILED: "FAILED",
} as const;

export const TEST_RESULT: Record<TestResult, string> = {
  PENDING: "PENDING",
  NEGATIVE: "NEGATIVE",
  POSITIVE: "POSITIVE",
} as const;

// 3. Helper Arrays for Dropdowns/Select Fields
export const ROLES_LIST = Object.values(ROLE);  
export const REQUEST_STATUS_LIST = Object.values(REQUEST_STATUS);
