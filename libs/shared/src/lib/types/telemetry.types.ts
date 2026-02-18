export interface TelemetryEvent {
  deviceId: string;
  timestamp: string;
  lat: number;
  lng: number;
  temperature: number;
  humidity: number;
  battery: number;
}

export interface RedisStreamMessage {
  id: string;
  data: TelemetryEvent;
}