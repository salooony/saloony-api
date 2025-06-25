import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAgeAtLeast(minAge: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAgeAtLeast',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [minAge],
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return false;
          const birthdate = new Date(value);
          if (isNaN(birthdate.getTime())) return false;

          const today = new Date();

          const age = today.getFullYear() - birthdate.getFullYear();
          const monthDiff = today.getMonth() - birthdate.getMonth();

          return age > minAge || (age === minAge && monthDiff >= 0);
        },

        defaultMessage(args: ValidationArguments) {
          const minAge = args.constraints[0];
          return `User must be at least ${minAge} years old.`;
        },
      },
    });
  };
}
