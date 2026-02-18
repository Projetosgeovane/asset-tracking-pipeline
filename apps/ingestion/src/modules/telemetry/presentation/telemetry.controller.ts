import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { IngestTelemetryUseCase } from "../application/use-cases/ingest-telemetry.use-case";
import { TelemetryPayloadDto } from "@asset-tracking-pipeline/shared";

@Controller('telemetry')
export class TelemetryController {
  constructor(
    private readonly ingestTelemetryUseCase: IngestTelemetryUseCase,
  ) { }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async ingest(@Body() payload: TelemetryPayloadDto): Promise<void> {
    await this.ingestTelemetryUseCase.execute({
      deviceId: payload.deviceId,
      timestamp: payload.timestamp,
      lat: payload.location.lat,
      lng: payload.location.lng,
      temperature: payload.temperature,
      humidity: payload.humidity,
      battery: payload.battery,
    });
  }
}