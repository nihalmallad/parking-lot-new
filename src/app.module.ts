import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [ParkingModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
