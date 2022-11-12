import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from '../../parking/service/parking.service';
import { SlotService } from './slot.service';

describe('SlotService', () => {
  let service: SlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotService, ParkingService],
    }).compile();

    service = module.get<SlotService>(SlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
