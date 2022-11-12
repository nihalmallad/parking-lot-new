import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('parking/slots')
export class SlotsController {
    @Get()
    getAllParkingSlots(): string {
        return ""
    }

    @Get()
    getAllParkingSlotsByColor(): string{
        return ""
    }

    @Post()
    createParkingSlot(): string {
        return "";
    }

    @Delete()
    freeParkingSlot(id: number): string{
        return ""
    }
}
