export const HASHING_PROVIDER = 'HashingProvider';

export interface IHashingProvider {
  hash(data: string): Promise<string>;
  compare(data: string, encrypted: string): Promise<boolean>;
}
