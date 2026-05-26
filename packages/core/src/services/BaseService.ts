import { IHttpClient } from './http/HttpClient.interface'

export class BaseService {
  protected client: IHttpClient

  constructor(client: IHttpClient) {
    this.client = client
  }
}
