import { Injectable } from '@nestjs/common';
import PriorityQueue from "priority-queue-typescript";
import { Parking } from './parking.interface';
import { ParkingRequest, ParkingResponse } from "./parking.dto";

let INIT_CAPACITY = 10
let AvailableSlots = new PriorityQueue<number>(INIT_CAPACITY, (a: number, b: number) => a - b);

@Injectable()
export class ParkingService implements Parking {

    addSlot(slotId: number): void {
        AvailableSlots.add(slotId);
    }

    createSlot(request: ParkingRequest): ParkingResponse {
        for (let i = 1; i <= request.capacity; i++) {
            AvailableSlots.add(i);
        }
        return new ParkingResponse(AvailableSlots.size())
    }

    updateSlot(request: ParkingRequest): ParkingResponse {
        let size = AvailableSlots.size();
        for (let i = 1; i <= request.capacity; i++) {
            AvailableSlots.add(size + i);
        }
        return new ParkingResponse(AvailableSlots.size())
    }

    getFreeSlot(): number {
        return AvailableSlots.poll()
    }

    size(): number {
        return AvailableSlots.size();
    }

    isSlotAvailable(): boolean {
        return AvailableSlots.size() != 0
    }
}

// initializes the parking slots with given capacity
let _ = new ParkingService().createSlot(new ParkingRequest("", INIT_CAPACITY))