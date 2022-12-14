import { Injectable } from '@nestjs/common';
import { ParkingService } from '../../parking/service/parking.service';
import { SlotErrorCode, SlotRequest, SlotResponse } from '../dto/slot.dto';

import { Slot } from './slot.interface';


let AllocatedSlots = new Map<number, SlotRequest>();
let Vehicles = new Set<string>();

@Injectable()
export class SlotService implements Slot {

    constructor(
        private parkingService: ParkingService) { }

    size(): number {
        return AllocatedSlots.size;
    }

    allocateSlot(request: SlotRequest): [SlotResponse, SlotErrorCode] {
        if (Vehicles.has(request.reg_no)) {
            return [new SlotResponse(-1), SlotErrorCode.EXISTS];
        }

        if (this.parkingService.isSlotAvailable()) {
            let slot_id: number = this.parkingService.getFreeSlot();
            request.slot_no = slot_id
            AllocatedSlots.set(slot_id, request);

            Vehicles.add(request.reg_no);

            return [new SlotResponse(slot_id), SlotErrorCode.NONE];
        }
        return [new SlotResponse(-1), SlotErrorCode.FULL];
    }

    freeSlot(slotId: number): void {
        if (AllocatedSlots.has(Number(slotId))) {
            let regno = AllocatedSlots.get(slotId).reg_no;
            Vehicles.delete(regno);
            AllocatedSlots.delete(slotId);
        }
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