import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ErrorSource {
  path: string;
  message: string;
}

export interface ErrorResponse {
  data: {
    errorSources: ErrorSource[];
    message: string;
  };
  success: boolean;
  status: number;
}

interface SuccessResponse {
  data: {
    message: string;
    success: boolean;
  };
}

export type ApiResponse =
  | SuccessResponse
  | { error: FetchBaseQueryError | SerializedError };
