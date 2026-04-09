import {
  PatchUserProfileFields,
  PatchUserProfileRequestDto,
} from '@user/application/dtos/requests/patch-user-profile.request.dto';
import { UserResponseDto } from '@user/application/dtos/responses/user.response.dto';
import { User } from '@user/domain/entities/user';
import { IUserRepository, USERS_REPOSITORY } from '@user/domain/ports/iuser.repository';
import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class PatchUserProfileUseCase {
  private readonly logger = new Logger(PatchUserProfileUseCase.name);

  constructor(@Inject(USERS_REPOSITORY) private readonly userRepository: IUserRepository) {}

  async execute(userId: string, dto: PatchUserProfileRequestDto): Promise<UserResponseDto> {
    const patch = dto.definedEntries();

    if (!dto.hasAnyUpdatableField()) {
      throw new UnprocessableEntityException('At least one updatable field must be provided.');
    }

    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.assertEmailIsUnique(dto.email, user.id, user.email);
    await this.assertMobileIsUnique(dto.mobileNumber, user.id, user.mobileNumber);

    const changedFields = this.extractChangedFields(user, patch);

    if (changedFields.length === 0) {
      throw new UnprocessableEntityException('No profile changes were provided.');
    }

    this.applyPatch(user, patch);
    user.updatedAt = new Date();

    let updatedUser: User;

    try {
      updatedUser = await this.userRepository.update(user);
    } catch (error) {
      if (error instanceof Error && error.message.includes('duplicate key')) {
        throw new ConflictException('A user with the same email and/or mobileNumber already exists.');
      }

      throw new InternalServerErrorException('Failed to update profile.');
    }

    this.logger.log(
      JSON.stringify({
        event: 'user.profile.patch',
        userId,
        changedFields,
      }),
    );

    return UserResponseDto.createFromEntity(updatedUser);
  }

  private async assertEmailIsUnique(
    newEmail: string | undefined,
    currentUserId: string,
    currentEmail: string,
  ): Promise<void> {
    if (!newEmail || newEmail === currentEmail) {
      return;
    }

    const existingUser = await this.userRepository.findOneByEmail(newEmail);

    if (existingUser && existingUser.id !== currentUserId) {
      throw new ConflictException('A user with this email already exists.');
    }
  }

  private async assertMobileIsUnique(
    newMobileNumber: string | undefined,
    currentUserId: string,
    currentMobileNumber: string,
  ): Promise<void> {
    if (!newMobileNumber || newMobileNumber === currentMobileNumber) {
      return;
    }

    const existingUser = await this.userRepository.findOneByMobileNumber(newMobileNumber);

    if (existingUser && existingUser.id !== currentUserId) {
      throw new ConflictException('A user with this mobile number already exists.');
    }
  }

  private extractChangedFields(user: User, patch: PatchUserProfileFields): string[] {
    const changedFields: string[] = [];

    if (patch.firstname !== undefined && patch.firstname !== user.firstname) {
      changedFields.push('firstname');
    }

    if (patch.lastname !== undefined && patch.lastname !== user.lastname) {
      changedFields.push('lastname');
    }

    if (patch.email !== undefined && patch.email !== user.email) {
      changedFields.push('email');
    }

    if (patch.mobileNumber !== undefined && patch.mobileNumber !== user.mobileNumber) {
      changedFields.push('mobileNumber');
    }

    if (patch.birthdate !== undefined && !this.isSameDate(patch.birthdate, user.birthdate)) {
      changedFields.push('birthdate');
    }

    if (patch.language !== undefined && patch.language !== user.language) {
      changedFields.push('language');
    }

    if (patch.emailReminders !== undefined && patch.emailReminders !== user.emailReminders) {
      changedFields.push('emailReminders');
    }

    if (patch.smsReminders !== undefined && patch.smsReminders !== user.smsReminders) {
      changedFields.push('smsReminders');
    }

    return changedFields;
  }

  private applyPatch(user: User, patch: PatchUserProfileFields): void {
    if (patch.firstname !== undefined) user.firstname = patch.firstname;
    if (patch.lastname !== undefined) user.lastname = patch.lastname;
    if (patch.email !== undefined) user.email = patch.email;
    if (patch.mobileNumber !== undefined) user.mobileNumber = patch.mobileNumber;
    if (patch.birthdate !== undefined) user.birthdate = patch.birthdate;
    if (patch.language !== undefined) user.language = patch.language;
    if (patch.emailReminders !== undefined) user.emailReminders = patch.emailReminders;
    if (patch.smsReminders !== undefined) user.smsReminders = patch.smsReminders;
  }

  private isSameDate(a: Date, b: Date): boolean {
    return a.getTime() === b.getTime();
  }
}
