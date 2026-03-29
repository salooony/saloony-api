import { User } from '@app/user/domain/entities/user';
import type { FastifyRequest } from 'fastify';

export type AppRequest = FastifyRequest & {
  user?: User;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
  headers: {
    authorization?: string;
  } & Record<string, unknown>;
};
