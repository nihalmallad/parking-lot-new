import { Observable } from "rxjs";
import { ParkingRequest, ParkingResponse } from "../dto/parking.dto";

export interface Parking {
    add(slotId: number): void
    create(request: ParkingRequest): ParkingResponse;
    update(request: ParkingRequest): ParkingResponse;
    getSlot(): number | null
    size(): number
    isSlotAvailable(): boolean;
}


