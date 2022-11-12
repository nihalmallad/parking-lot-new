import { Injectable } from '@nestjs/common';
import { SlotRequest, SlotResponse } from 'src/parking/slots/slot.dto';
import { ParkingService } from '../parking.service';
import { Slot } from './slots.interface';


let slots = new Map<number, SlotRequest>();

@Injectable()
export class SlotService implements Slot {

    constructor(private parkingService: ParkingService){}

    size(): number {
       return slots.size;
    }

    allocate(request: SlotRequest): SlotResponse {
        if (this.parkingService.isSlotAvailable()) {
            let slot_id = this.parkingService.getSlot();
            request.slot_no = slot_id
            slots.set(slot_id, request);
            return new SlotResponse(slot_id);
        }
        return new SlotResponse(-1);
    }

    free(slotId: number): void {
        // TODO: fix the delete
        slots.forEach((value: SlotRequest, key: number) => {
            console.log(value);
        });
      console.log(slots.delete(slotId));
    }

    get(): SlotRequest[] {
        let data = new Array<SlotRequest>();
        slots.forEach((value: SlotRequest) => {
            data.push(value);
        });
        return data;
    }

    getByColor(color: string): SlotRequest[] {
        let data = new Array<SlotRequest>();
        slots.forEach((value: SlotRequest, key: number) => {
            if (value.color == color) {
                data.push(value);
            }
        });
        return data;
    }
}