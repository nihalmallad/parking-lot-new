import { Observable } from "rxjs";
import { ParkingRequest, ParkingResponse } from "./parking.dto";

export interface Parking {
    addSlot(slotId: number): void
    createSlot(request: ParkingRequest): ParkingResponse;
    updateSlot(request: ParkingRequest): ParkingResponse;
    getFreeSlot(): number | null
    size(): number
    isSlotAvailable(): boolean;
}


