import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SlotRequest, SlotResponse } from 'src/parking/slots/slot.dto';
import { ParkingService } from '../parking.service';
import { SlotService } from './slots.service';

@Controller('parking/slots')
export class SlotsController {
    constructor(private slotService: SlotService,
        private parkingService: ParkingService){}

    @Get()
    getAllParkingSlotsByColor(@Query('color') color: string): SlotRequest[] {
        if (color == undefined || color == "") {
            return this.slotService.get();
        }
        return this.slotService.getByColor(color);
    }

    @Post()
    createParkingSlot(@Body() request: SlotRequest): SlotResponse {
        return this.slotService.allocate(request);
    }

    @Delete(':id')
    freeParkingSlot(@Param('id') id: number) {
        this.slotService.free(id);
        this.parkingService.add(id);
        return id;
    }
}
