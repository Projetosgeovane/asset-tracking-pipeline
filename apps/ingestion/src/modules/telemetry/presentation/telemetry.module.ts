import { Module } from '@nestjs/common';
import { TelemetryController } from './telemetry.controller';
import { IngestTelemetryUseCase } from '../application/use-cases/ingest-telemetry.use-case';
import { TELEMETRY_QUEUE_PORT } from '../application/ports/telemetry-queue.port';
import { RedisStreamAdapter } from '../infrastructure/redis/redis.stream.adapter.';

@Module({
  controllers: [TelemetryController],
  providers: [
    IngestTelemetryUseCase,
    {
      provide: TELEMETRY_QUEUE_PORT,
      useClass: RedisStreamAdapter,
    },
  ],
})
export class TelemetryModule { }