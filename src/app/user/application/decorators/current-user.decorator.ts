import { AppRequest } from '@app/shared/application/requests/app.request';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<AppRequest>();

  return request.user;
});
