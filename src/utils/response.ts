import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: any;
}

export const sendResponse = <T>(res: Response, statusCode: number, data: T, meta?: any) => {
  const response: ApiResponse<T> = {
    success: statusCode >= 200 && statusCode < 300,
    data,
    meta,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (res: Response, statusCode: number, message: string) => {
  const response: ApiResponse<null> = {
    success: false,
    error: message,
  };
  return res.status(statusCode).json(response);
};
