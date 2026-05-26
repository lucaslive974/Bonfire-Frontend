import { BaseService as CoreBaseService, IHttpClient } from '@bonfire/core'
import { httpClient } from './http/httpClient'

export class BaseService extends CoreBaseService {
  constructor(client: IHttpClient = httpClient) {
    super(client)
  }
}
