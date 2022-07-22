import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import * as jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { User } from '../user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class AwsCognitoGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    let authorizationString: any = '';
    if (Array.isArray(authorization)) {
      authorizationString = authorization[0];
    } else {
      authorizationString = authorization;
    }
    try {
      const data = await this.authorizedByCognito(authorizationString);
      if (data.username) {
        const user: User = await this.authService.getUser(data.username);
        request.user = user;
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async authorizedByCognito(authHeader?: string): Promise<any> {
    if (!authHeader) {
      throw new UnauthorizedException(`Authorization header is required`);
    }
    const tokenArray = authHeader.split(' ', 2);
    if (!tokenArray[0] || tokenArray[0].toLowerCase() !== 'bearer') {
      throw new UnauthorizedException('Token type must be Bearer');
    }

    return await this.validateAccessToken(tokenArray[1]);
  }

  async validateAccessToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://cognito-idp.${this.configService.get(
            'COGNITO_REGION',
          )}.amazonaws.com/${this.configService.get(
            'COGNITO_USER_POOL_ID',
          )}/.well-known/jwks.json`,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then((response) => {
          const body = response.data;
          const pems = {};
          const keys = body['keys'];
          keys.forEach((key) => {
            const keyId = key.kid;
            const modulus = key.n;
            const exponent = key.e;
            const keyType = key.kty;
            const jwk = { kty: keyType, n: modulus, e: exponent };
            const pem = jwkToPem(jwk);
            pems[keyId] = pem;
          });
          const decodedJwt = jwt.decode(token, { complete: true });
          if (!decodedJwt) {
            reject(new Error('Not a valid JWT token'));
          }
          const kid = decodedJwt['header'].kid;

          const pem = pems[kid];
          if (!pem) {
            reject(new Error('Invalid token'));
          }
          jwt.verify(token, pem, (err, payload) => {
            if (err) {
              reject(new Error('Invalid token'));
            } else {
              resolve(payload);
            }
          });
        })
        .catch((e) => {
          reject(new Error(e));
        });
    });
  }
}
