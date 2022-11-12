import { Module } from '@nestjs/common';
import { SlotsController } from '../slot/controller/slots.controller';
import { SlotService } from '../slot/service/slot.service';


import { SlotModule } from '../slot/slot.module';
import { ParkingController } from './controller/parking.controller';
import { ParkingService } from './service/parking.service';

@Module({
  providers: [ParkingService, SlotService],
  controllers: [ParkingController, SlotsController],
  imports: [SlotModule]
})
export class ParkingModule {}
