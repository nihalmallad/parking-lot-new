import { Module } from '@nestjs/common';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [ParkingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
