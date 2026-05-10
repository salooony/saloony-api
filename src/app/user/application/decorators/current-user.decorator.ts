import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AppRequest } from '@shared/application/requests/app.request';

export const CurrentUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<AppRequest>();

  return request.user;
});
