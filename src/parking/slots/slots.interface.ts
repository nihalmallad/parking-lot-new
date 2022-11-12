import { SlotRequest, SlotResponse } from "src/parking/slots/slot.dto";

export interface Slot {
    allocate(request: SlotRequest): SlotResponse;
    free(slotId: number): void;
    get(): SlotRequest[];
    getByColor(color: string): SlotRequest[];
    size(): number;
}
