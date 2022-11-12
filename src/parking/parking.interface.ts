export interface Parking {
    add(slotId: number): void
    create(request: ParkingReq): ParkingResp;
    update(request: ParkingReq): ParkingResp;
    getSlot(): number | null
    size(): number
    isSlotAvailable(): boolean;
}

export class ParkingReq {
    name: string;
    capacity: number;
    constructor(name: string, capacity: number){
        this.name = name;
        this.capacity = capacity;
    }
}

export class ParkingResp {
    total_slots: number;
    constructor(total_slots: number) {
        this.total_slots = total_slots;
    }
}
