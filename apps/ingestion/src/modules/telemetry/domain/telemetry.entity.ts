export class TelemetryEntity {
  constructor(
    public readonly id: string,
    public readonly deviceId: string,
    public readonly timestamp: string,
    public readonly lat: number,
    public readonly lng: number,
    public readonly temperature: number,
    public readonly humidity: number,
    public readonly battery: number,
  ) { }

  static create(props: {
    deviceId: string,
    timestamp: string,
    lat: number,
    lng: number,
    temperature: number,
    humidity: number,
    battery: number,
  }): TelemetryEntity {
    return new TelemetryEntity(
      crypto.randomUUID(),
      props.deviceId,
      props.timestamp ? new Date(props.timestamp).toISOString() : new Date().toISOString(),
      props.lat,
      props.lng,
      props.temperature,
      props.humidity,
      props.battery,

    );
  }

  isTemperatureAnomaly(min = -10, max = 30): boolean {
    return this.temperature < min || this.temperature > max;
  }

  isBatteryCritical(threshold = 10): boolean {
    return this.battery <= threshold;
  }

  isBatteryWarning(threshold = 20): boolean {
    return this.battery <= threshold;
  }

  isHumidityAnomaly(max = 85): boolean {
    return this.humidity > max;
  }
}