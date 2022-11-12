import { Module } from '@nestjs/common';
import { SlotsController } from 'src/slot/controller/slots.controller';
import { SlotService } from 'src/slot/service/slots.service';

import { SlotsModule } from '../slot/slots.module';
import { ParkingController } from './controller/parking.controller';
import { ParkingService } from './service/parking.service';

@Module({
  providers: [ParkingService, SlotService],
  controllers: [ParkingController, SlotsController],
  imports: [SlotsModule]
})
export class ParkingModule {}
