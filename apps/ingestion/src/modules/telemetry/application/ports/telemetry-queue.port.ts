import { TelemetryEntity } from "../../domain/telemetry.entity";

export const TELEMETRY_QUEUE_PORT = Symbol('TelemetryQueuePort');

export abstract class TelemetryQueuePort {
  abstract publish(telemetry: TelemetryEntity): Promise<void>;
}