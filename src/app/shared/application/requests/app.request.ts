import { User } from '@app/user/domain/entities/user';
import type { FastifyRequest } from 'fastify';

export type AppRequest = FastifyRequest & {
  user?: User;
  headers: {
    authorization?: string;
  } & Record<string, unknown>;
};