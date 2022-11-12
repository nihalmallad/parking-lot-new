import { Test, TestingModule } from '@nestjs/testing';
import { SlotService } from '../../slot/service/slot.service';
import { ParkingService } from '../service/parking.service';
import { ParkingController } from './parking.controller';


describe('ParkingController', () => {
  let controller: ParkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers:[ParkingService, SlotService]
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
