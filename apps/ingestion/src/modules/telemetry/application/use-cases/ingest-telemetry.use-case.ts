import { Inject, Injectable } from "@nestjs/common";
import { TELEMETRY_QUEUE_PORT, TelemetryQueuePort } from "../ports/telemetry-queue.port";
import { TelemetryEntity } from "../../domain/telemetry.entity";

@Injectable()
export class IngestTelemetryUseCase {
  constructor(
    @Inject(TELEMETRY_QUEUE_PORT)
    private readonly telemetryQueuePort: TelemetryQueuePort,
  ) { }

  async execute(payload: {
    deviceId: string;
    timestamp: string;
    lat: number;
    lng: number;
    temperature: number;
    humidity: number;
    battery: number;
  }): Promise<void> {
    const telemetry = TelemetryEntity.create({
      deviceId: payload.deviceId,
      timestamp: payload.timestamp,
      lat: payload.lat,
      lng: payload.lng,
      temperature: payload.temperature,
      humidity: payload.humidity,
      battery: payload.battery,
    });

    await this.telemetryQueuePort.publish(telemetry);
  }
}