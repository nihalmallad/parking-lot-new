import { Length, IsNotEmpty, Min, Max } from 'class-validator'

export class ParkingRequest {
    @Length(5, 20)
    @IsNotEmpty()
    name: string;

    @Min(1)
    @Max(1000)
    capacity: number;

    constructor(name: string, capacity: number) {
        this.name = name;
        this.capacity = capacity;
    }
}

export class ParkingResponse {
    total_slots: number;
    allocated_slots: number;
    free_slots: number;
    constructor(total_slots: number, allocated_slots?: number, free_slots?: number) {
        this.total_slots = total_slots;
        this.allocated_slots = allocated_slots;
        this.free_slots = free_slots;
    }
}
