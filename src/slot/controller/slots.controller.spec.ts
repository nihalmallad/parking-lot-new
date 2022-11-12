import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from '../../parking/service/parking.service';
import { SlotService } from '../service/slot.service';
import { SlotsController } from './slots.controller';

describe('SlotsController', () => {
  let controller: SlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotsController],
      providers:[SlotService, ParkingService]
    }).compile();

    controller = module.get<SlotsController>(SlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
