export class LocationDto {
  lat!: number;
  lng!: number;
}

export class TelemetryPayloadDto {
  deviceId!: string;
  timestamp!: string;
  location!: LocationDto;
  temperature!: number;
  humidity!: number;
  battery!: number;
}