import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from '../../parking/service/parking.service';
import { SlotRequest } from '../dto/slot.dto';
import { SlotService } from './slot.service';

describe('SlotService', () => {
  let slotService: SlotService;
  let parkingService: ParkingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlotService, ParkingService],
    }).compile();

    slotService = module.get<SlotService>(SlotService);
    parkingService = module.get<ParkingService>(ParkingService);
  });

  it('should be able to allocate the parking', () => {
    let resp = slotService.allocateSlot(new SlotRequest("KA281234", "green", "car"));
    expect(resp.ticket_id).toEqual(1);
    expect(slotService.size()).toEqual(1);
    slotService.freeSlot(resp.ticket_id);
  });

  it('should be able to get all the parking', () => {
    let resp1 = slotService.allocateSlot(new SlotRequest("KA281234", "green", "car"));
    let resp2 = slotService.allocateSlot(new SlotRequest("KA281235", "red", "car"));
    expect(slotService.getAllSlots().length).toEqual(2);

    slotService.freeSlot(resp1.ticket_id);
    slotService.freeSlot(resp2.ticket_id);
    expect(slotService.getAllSlots().length).toEqual(0);
  });

  it('should be able to get the parking by color', () => {
    let resp = slotService.allocateSlot(new SlotRequest("KA281234", "green", "car"));
    expect(slotService.getAllSlotsByColor("green").length).toEqual(1);
    expect(slotService.getAllSlotsByColor("red").length).toEqual(0);

    slotService.freeSlot(resp.ticket_id);
    expect(slotService.getAllSlotsByColor("green").length).toEqual(0);
  });

});
