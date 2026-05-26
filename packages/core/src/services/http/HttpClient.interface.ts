export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
}

export interface IHttpClient {
  get<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  post<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  patch<T>(url: string, data?: any, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
  delete<T>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>>;
}

export class HttpError extends Error {
  status?: number;
  data?: any;

  constructor(message: string, status?: number, data?: any) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.data = data;
  }
}
