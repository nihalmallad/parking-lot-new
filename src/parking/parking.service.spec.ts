import { Test, TestingModule } from '@nestjs/testing';
import { ParkingRequest } from './parking.dto';
import { ParkingService } from './parking.service';

describe('ParkingService', () => {
  let parkingService: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParkingService],
    }).compile();

    parkingService = module.get<ParkingService>(ParkingService);
  });

  it('should be having the initial capacity', () => {
    expect(parkingService.size()).toEqual(10);
  });

  it('should be able to update the capacity', () => {
    parkingService.updateSlot(new ParkingRequest("", 10))
    expect(parkingService.size()).toEqual(20);
  });

  it('should be able to add the slot', () => {
    let slot_no = 21;
    parkingService.addSlot(slot_no)
    expect(parkingService.size()).toEqual(21);
  });

  it('should be able to add the slot', () => {
    let slot_no = parkingService.getFreeSlot()
    expect(slot_no).toEqual(1)
    expect(parkingService.size()).toEqual(20);
  });

  it('should be able see if the slot is available', () => {
    expect(parkingService.isSlotAvailable()).toEqual(true)
  });

});
