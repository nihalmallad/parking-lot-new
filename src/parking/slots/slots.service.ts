import { Injectable } from '@nestjs/common';
import { ParkingSvc } from '../parking.service';
import { Slot, SlotReq, SlotResp } from './slots.interface';

let slots = new Map<number, SlotReq>();

@Injectable()
export class SlotsService implements Slot {
    allocate(request: SlotReq): SlotResp {
        if (ParkingSvc.isSlotAvailable()) {
            let slot_id = Number(ParkingSvc.getSlot());
            request.slot_no = slot_id
            slots.set(slot_id, request);
            return new SlotResp(slot_id);
        }
        return new SlotResp(-1);
    }

    free(slotId: number): void {
        if (slots.has(slotId)) {
            slots.delete(slotId)
        }
    }

    get(): SlotReq[] {
        let data = new Array<SlotReq>();
        slots.forEach((value: SlotReq) => {
            data.push(value)
        });
        return data;
    }

    getByColor(color: string): SlotReq[] {
        let data = new Array<SlotReq>();
        slots.forEach((value: SlotReq, key: number) => {
            if (value.color == color) {
                data.push(value)
            }
        });
        return data;
    }
}

