
export class SlotRequest {
    slot_no: number | undefined;
    reg_no: string;
    color: string;
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