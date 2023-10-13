import { Module } from '@nestjs/common';
import { PongGateway } from './pong.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [PongGateway],
})
export class PongModule {}