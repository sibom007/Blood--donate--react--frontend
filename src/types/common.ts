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
