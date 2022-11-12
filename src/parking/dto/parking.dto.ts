import { Length, IsNotEmpty, Min, Max } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class ParkingRequest {
    @Length(5, 20)
    @IsNotEmpty()
    @ApiProperty({example: "finmo"})
    name: string;

    @Min(1)
    @Max(1000)
    @ApiProperty({example: 5})
    capacity: number;

    constructor(name: string, capacity: number) {
        this.name = name;
        this.capacity = capacity;
    }
}

export class ParkingResponse {
    @ApiProperty()
    total_slots: number;

    @ApiProperty()
    allocated_slots: number;

    @ApiProperty()
    free_slots: number;
    constructor(total_slots: number, allocated_slots?: number, free_slots?: number) {
        this.total_slots = total_slots;
        this.allocated_slots = allocated_slots;
        this.free_slots = free_slots;
    }
}
