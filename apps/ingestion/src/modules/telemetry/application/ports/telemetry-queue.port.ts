import { TelemetryEntity } from "../../domain/telemetry.entity";


export const TELEMETRY_QUEUE_PORT = Symbol('TelemetryQueuePort');

export interface ITelemetryQueuePort {
  publish(telemetry: TelemetryEntity): Promise<void>;
}