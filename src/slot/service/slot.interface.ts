import { SlotRequest, SlotResponse } from "../dto/slot.dto";


export interface Slot {
    allocateSlot(request: SlotRequest): SlotResponse;
    freeSlot(slotId: number): void;
    getAllSlots(): SlotRequest[];
    getAllSlotsByColor(color: string): SlotRequest[];
    size(): number;
}
