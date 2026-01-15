import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard de autenticação JWT para proteger rotas.
 *
 * Estende a estratégia de autenticação JWT do Passport, permitindo que apenas
 * requisições com um token JWT válido no header (Bearer token) possam acessar
 * as rotas protegidas por este guard.
 *
 * @example
 * ```typescript
 * @UseGuards(JwtGuard)
 * @Get('profile')
 * findProfile(@Request() req) {
 *   return req.user;
 * }
 * ```
 *
 * @remarks
 * - A estratégia 'jwt' deve estar configurada no módulo de autenticação
 * - O token deve ser enviado no header: `Authorization: Bearer <token>`
 * - Valida automaticamente a assinatura e expiração do token
 * - Injeta os dados do usuário no objeto `req.user` quando validado com sucesso
 *
 * @injectable
 * @see AuthGuard
 */
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
