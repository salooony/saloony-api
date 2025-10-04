import { User } from '@app/user/domain/entities/user';
import { Request } from 'express';

export interface AppRequest extends Request {
  user?: User;
}
