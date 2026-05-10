// controllers
export { AuthController } from './controllers/auth.controller';
export { UserController } from './controllers/user.controller';

// guards
export { TokenGuard } from './guards/token.guard';

// mock repositories
export { MockUsersReporitory } from './mock-repositories/user.mock.repository';

// providers
export { BcryptHashingProvider } from './providers/bcrypt.hashing.provider';
export { TokenGenerator } from './providers/token-generator.provider';

// repositories
// export { PasswordResetTokensRepository } from './repositories/password_reset_token.repository';
export { UsersRepository } from './repositories/user.repository';

// schemas
export { User } from './schemas/user.schema';
// TODO: fix this
// export { PasswordResetToken } from './schemas/password-reset-token.schema';
export { SalonMembership } from './schemas/salon-membership.schema';
