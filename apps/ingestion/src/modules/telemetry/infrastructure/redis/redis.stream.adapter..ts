import { Logger, OnModuleInit } from "@nestjs/common";
import { TelemetryQueuePort } from "../../application/ports/telemetry-queue.port";
import Redis from "ioredis";
import { TelemetryEntity } from "../../domain/telemetry.entity";

export const REDIS_STREAM_KEY = 'telemetry:events';

export class RedisStreamAdapter implements TelemetryQueuePort, OnModuleInit {
  private readonly logger = new Logger(RedisStreamAdapter.name);
  private client!: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT || '6379'),
    });

    this.client.on('connect', () => {
      this.logger.log('Redis connected');
    });

    this.client.on('error', (error) => {
      this.logger.error('Redis connection error', error);
    });
  }

  async publish(telemetry: TelemetryEntity): Promise<void> {
    await this.client.xadd(
      REDIS_STREAM_KEY,
      '*',
      'deviceId', telemetry.deviceId,
      'timestamp', telemetry.timestamp,
      'lat', telemetry.lat,
      'lng', telemetry.lng,
      'temperature', telemetry.temperature,
      'humidity', telemetry.humidity,
      'battery', telemetry.battery,
    );

    this.logger.log(`Published telemetry for device ${telemetry.deviceId}`);
  }

}