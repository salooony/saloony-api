import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsMobilePhone,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';

export type PatchUserProfileFields = {
  firstname?: string;
  lastname?: string;
  email?: string;
  mobileNumber?: string;
  birthdate?: Date;
  language?: string;
  emailReminders?: boolean;
  smsReminders?: boolean;
};

export class PatchUserProfileRequestDto {
  @ApiPropertyOptional({ description: 'The first name.', type: String, example: 'John' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public firstname?: string;

  @ApiPropertyOptional({ description: 'The last name.', type: String, example: 'Doe' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public lastname?: string;

  @ApiPropertyOptional({ description: 'The email address.', type: String, example: 'example@email.com' })
  @IsOptional()
  @IsEmail()
  public email?: string;

  @ApiPropertyOptional({ description: 'The mobile number.', type: String, example: '+21699111222' })
  @IsOptional()
  @IsMobilePhone()
  public mobileNumber?: string;

  @ApiPropertyOptional({ description: 'The date of birth.', type: String, example: '2005-04-03' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  public birthdate?: Date;

  @ApiPropertyOptional({ description: 'The preferred language.', type: String, example: 'French' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  public language?: string;

  @ApiPropertyOptional({ description: 'Whether the user receives reminders by email.', type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  public emailReminders?: boolean;

  @ApiPropertyOptional({ description: 'Whether the user receives reminders by SMS.', type: Boolean, example: true })
  @IsOptional()
  @IsBoolean()
  public smsReminders?: boolean;

  public hasAnyUpdatableField(): boolean {
    return Object.keys(this.definedEntries()).length > 0;
  }

  public definedEntries(): PatchUserProfileFields {
    const fields: PatchUserProfileFields = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      mobileNumber: this.mobileNumber,
      birthdate: this.birthdate,
      language: this.language,
      emailReminders: this.emailReminders,
      smsReminders: this.smsReminders,
    };

    return Object.fromEntries(
      Object.entries(fields).filter(([, value]) => value !== undefined),
    ) as PatchUserProfileFields;
  }
}
