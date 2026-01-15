import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator que extrai o usuário atual da requisição HTTP.
 * 
 * Utiliza o NestJS `createParamDecorator` para criar um decorator customizado
 * que pode ser aplicado a parâmetros de método em controllers.
 * 
 * O decorator acessa o contexto de execução, extrai a requisição HTTP e retorna
 * o objeto `user` que foi previamente populado (geralmente pela estratégia de autenticação).
 * 
 * @decorator
 * @param data - Parâmetro não utilizado, mantido para compatibilidade com a interface de decorators do NestJS
 * @param ctx - Contexto de execução que fornece acesso ao contexto HTTP
 * @returns O objeto do usuário autenticado presente em `request.user`
 * 
 * @example
 * ```typescript
 * @Get('profile')
 * getProfile(@CurrentUser() user: UserDto) {
 *   return user;
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
