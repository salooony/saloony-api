import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 'L9nT7Bz4PxVyQm1ZaJqK2GdWc@X#lF3vR6!CmH5YvNaV2bKd',
  signOptions: { algorithm: 'HS256', expiresIn: '1h' },
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL) || 300,
  refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL) || 86400,
}));
