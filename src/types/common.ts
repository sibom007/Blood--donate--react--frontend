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

export type bloodRequest = {
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
  createdAt: Date;
  updatedAt: Date;
};

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
