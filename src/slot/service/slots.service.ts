import { Injectable } from '@nestjs/common';
import { ParkingService } from 'src/parking/service/parking.service';
import { SlotRequest, SlotResponse } from 'src/slot/dto/slot.dto';
import { Slot } from './slots.interface';


let AllocatedSlots = new Map<number, SlotRequest>();

@Injectable()
export class SlotService implements Slot {

    constructor(
        private parkingService: ParkingService){}

    size(): number {
       return AllocatedSlots.size;
    }

    allocateSlot(request: SlotRequest): SlotResponse {
        if (this.parkingService.isSlotAvailable()) {
             let slot_id: number = this.parkingService.getFreeSlot();
            request.slot_no = slot_id
            AllocatedSlots.set(slot_id, request);
            return new SlotResponse(slot_id);
        }
        return new SlotResponse(-1);
    }

    freeSlot(slotId: number): void {
      AllocatedSlots.delete(slotId)
    }

    getAllSlots(): SlotRequest[] {
        let data = new Array<SlotRequest>();
        AllocatedSlots.forEach((value: SlotRequest) => {
            data.push(value);
        });
        return data;
    }

    getAllSlotsByColor(color: string): SlotRequest[] {
        let data = new Array<SlotRequest>();
        AllocatedSlots.forEach((value: SlotRequest, key: number) => {
            if (value.color == color) {
                data.push(value);
            }
        });
        return data;
    }
}