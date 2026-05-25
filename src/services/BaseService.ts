import { IHttpClient } from './http/HttpClient.interface'
import { httpClient } from './http/httpClient'

export class BaseService {
  protected client: IHttpClient

  constructor(client: IHttpClient = httpClient) {
    this.client = client
  }
}
