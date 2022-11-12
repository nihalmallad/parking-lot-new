import { Length, IsNotEmpty } from 'class-validator'
export class SlotRequest {
    slot_no: number | undefined;

    @IsNotEmpty()
    @Length(6, 10)
    reg_no: string;

    @IsNotEmpty()
    @Length(3, 10)
    color: string;

    @IsNotEmpty()
    @Length(3, 20)
    type: string;

    constructor(reg_no: string, color: string, type: string) {
        this.reg_no = reg_no;
        this.color = color;
        this.type = type;
    }
}

export class SlotResponse {
    ticket_id: number;
    constructor(ticket_id: number) {
        this.ticket_id = ticket_id;
    }
}