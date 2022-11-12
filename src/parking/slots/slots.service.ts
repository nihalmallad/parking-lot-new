import { Injectable } from '@nestjs/common';
import { SlotRequest, SlotResponse } from 'src/dto/slots.dto';
import { ParkingSvc } from '../parking.service';
import { Slot } from './slots.interface';


let slots = new Map<number, SlotRequest>();

@Injectable()
export class SlotsService implements Slot {
    allocate(request: SlotRequest): SlotResponse {
        if (ParkingSvc.isSlotAvailable()) {
            let slot_id = Number(ParkingSvc.getSlot());
            request.slot_no = slot_id
            slots.set(slot_id, request);
            return new SlotResponse(slot_id);
        }
        return new SlotResponse(-1);
    }

    free(slotId: number): void {
        if (slots.has(slotId)) {
            slots.delete(slotId)
        }
    }

    get(): SlotRequest[] {
        let data = new Array<SlotRequest>();
        slots.forEach((value: SlotRequest) => {
            data.push(value)
        });
        return data;
    }

    getByColor(color: string): SlotRequest[] {
        let data = new Array<SlotRequest>();
        slots.forEach((value: SlotRequest, key: number) => {
            if (value.color == color) {
                data.push(value)
            }
        });
        return data;
    }
}

