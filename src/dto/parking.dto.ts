
export class ParkingRequest {
    name: string;
    capacity: number;
    constructor(name: string, capacity: number) {
        this.name = name;
        this.capacity = capacity;
    }
}

export class ParkingResponse {
    total_slots: number;
    constructor(total_slots: number) {
        this.total_slots = total_slots;
    }
}
