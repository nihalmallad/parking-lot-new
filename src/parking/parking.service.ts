import { Injectable } from '@nestjs/common';
import PriorityQueue from "priority-queue-typescript";
import { Observable, of } from 'rxjs';
import { Parking } from './parking.interface';
import { ParkingRequest, ParkingResponse } from "../dto/parking.dto";

let INIT_CAPACITY = 10
let FreeSlots = new PriorityQueue<number>(INIT_CAPACITY, (a: number, b: number) => a - b);

@Injectable()
export class ParkingService implements Parking {
    add(slotId: number): void {
        FreeSlots.add(slotId);
    }

    create(request: ParkingRequest): ParkingResponse {
        for (let i = 1; i <= request.capacity; i++) {
            FreeSlots.add(i);
        }
        return new ParkingResponse(FreeSlots.size())
    }

    update(request: ParkingRequest): ParkingResponse {
        let size = FreeSlots.size();
        for (let i = 1; i <= request.capacity; i++) {
            FreeSlots.add(size + i);
        }
        return new ParkingResponse(FreeSlots.size())
    }

    getSlot(): number {
        return FreeSlots.poll()
    }

    size(): number {
        return FreeSlots.size();
    }

    isSlotAvailable(): boolean {
        return FreeSlots.size() != 0
    }
}

export let ParkingSvc = new ParkingService();