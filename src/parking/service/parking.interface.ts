import { ParkingRequest, ParkingResponse } from "../dto/parking.dto";

export interface Parking {
    addSlot(slotId: number): void
    createSlot(request: ParkingRequest): ParkingResponse;
    updateSlot(request: ParkingRequest): ParkingResponse;
    getFreeSlot(): number | null
    size(): number
    isSlotAvailable(): boolean;
}


