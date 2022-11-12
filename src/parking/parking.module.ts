import { Module } from '@nestjs/common';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';
import { SlotsController } from './slots/slots.controller';
import { SlotsService } from './slots/slots.service';
import { SlotsModule } from './slots/slots.module';

@Module({
  providers: [ParkingService, SlotsService],
  controllers: [ParkingController, SlotsController],
  imports: [SlotsModule]
})
export class ParkingModule {}
