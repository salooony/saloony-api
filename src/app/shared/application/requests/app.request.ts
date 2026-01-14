import { User } from '@app/user/domain/entities/user.entity';
import type { FastifyRequest } from 'fastify';

export type AppRequest = FastifyRequest & {
  user?: User;
};
