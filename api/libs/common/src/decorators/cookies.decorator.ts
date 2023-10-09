import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator((key: string, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest();
  try {
    const cookie = key && key in request.cookies ? request.cookies[key] : key ? null : request.cookies;
    return cookie;
  } catch (err) {
    console.error(err);
  }
})