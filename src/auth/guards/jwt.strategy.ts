import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      JwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'sparehubsecretkeyrisingtech',
      // useFactory: async (configService: ConfigService) => {
      //   return {
      //     secretOrKey: configService.get('JWT_SECRET'),
      //   };
      // },
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
