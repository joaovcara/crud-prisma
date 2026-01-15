import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

/**
 * JWT Strategy para autenticação via Passport.js
 * 
 * Esta estratégia implementa a autenticação baseada em JWT (JSON Web Token)
 * utilizando o Passport.js. É responsável por:
 * 
 * - Extrair o token JWT do header Authorization (Bearer token)
 * - Validar a assinatura do token usando a chave secreta
 * - Verificar se o token ainda está válido (não expirado)
 * - Validar os dados do usuário contidos no payload do token
 * 
 * @class JwtStrategy
 * @extends PassportStrategy(Strategy)
 * @injectable
 * 
 * @param {AuthService} authService - Serviço de autenticação injetado para
 *        validar o usuário com base no payload do token
 * 
 * @method validate
 * @param {any} payload - Dados decodificados do JWT contendo informações do usuário
 * @returns {Promise<any>} Dados do usuário validado ou null se inválido
 * 
 * @note A chave secreta deve ser configurada via variável de ambiente JWT_SECRET
 *       em produção. O valor padrão é apenas para desenvolvimento.
 * @note ignoreExpiration é definido como false, garantindo que tokens expirados
 *       sejam rejeitados
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });
  }

  async validate(payload: any) {
    return this.authService.validateUser(payload);
  }
}
