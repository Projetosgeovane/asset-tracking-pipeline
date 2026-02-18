import { Module } from '@nestjs/common';
import { TelemetryModule } from '../modules/telemetry/presentation/telemetry.module';

@Module({
  imports: [TelemetryModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
