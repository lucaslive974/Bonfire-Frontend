export interface ITokenDecoder {
  /**
   * Decodes a JWT token string and returns its typed payload, or null if invalid.
   */
  decode<T = any>(token: string): T | null
}
