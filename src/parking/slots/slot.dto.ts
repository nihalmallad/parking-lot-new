import { Length, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class SlotRequest {
    slot_no: number | undefined;

    @IsNotEmpty()
    @Length(6, 10)
    @ApiProperty()
    reg_no: string;

    @IsNotEmpty()
    @Length(3, 10)
    @ApiProperty()
    color: string;

    @IsNotEmpty()
    @Length(3, 20)
    @ApiProperty()
    type: string;

    constructor(reg_no: string, color: string, type: string) {
        this.reg_no = reg_no;
        this.color = color;
        this.type = type;
    }
}

export class SlotResponse {
    @ApiProperty()
    ticket_id: number;

    constructor(ticket_id: number) {
        this.ticket_id = ticket_id;
    }
}