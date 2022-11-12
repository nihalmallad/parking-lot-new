import { SlotRequest, SlotResponse } from "src/dto/slots.dto";

export interface Slot {
    allocate(request: SlotRequest): SlotResponse;
    free(slotId: number): void;
    get(): SlotRequest[];
    getByColor(color: string): SlotRequest[];
}
