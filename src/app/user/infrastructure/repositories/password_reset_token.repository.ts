// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

// // import { PasswordResetToken as PasswordResetTokenSchema } from '..';
// import { PasswordResetToken, IPasswordResetTokensRepository } from '../../domain';

// @Injectable()
// export class PasswordResetTokensRepository implements IPasswordResetTokensRepository {
//   constructor(
//     // @InjectRepository(PasswordResetTokenSchema)
//     // private readonly repository: Repository<PasswordResetTokenSchema>,
//   ) {}

//   async create(token: PasswordResetToken): Promise<PasswordResetToken> {
//     const saved = await this.repository.save(token as PasswordResetTokenSchema);
//     return saved as PasswordResetToken;
//   }

//   async findByUserIdAndTokenHash(userId: string, tokenHash: string): Promise<PasswordResetToken | null> {
//     const token = await this.repository.findOne({ where: { userId, tokenHash } });
//     return token ?? null;
//   }

//   async findByTokenHash(tokenHash: string): Promise<PasswordResetToken | null> {
//     const entity = await this.repository.findOne({ where: { tokenHash } });
//     if (!entity) return null;

//     return new PasswordResetToken({
//       id: entity.id,
//       userId: entity.userId,
//       tokenHash: entity.tokenHash,
//       expiresAt: entity.expiresAt,
//       usedAt: entity.usedAt,
//       createdAt: entity.createdAt,
//       type: entity.type,
//     });
//   }

//   async deleteById(tokenId: string): Promise<void> {
//     await this.repository.delete(tokenId);
//   }
// }
