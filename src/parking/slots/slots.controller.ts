import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SlotRequest, SlotResponse } from 'src/parking/slots/slot.dto';
import { ParkingSvc } from '../parking.service';
import { SlotSvc } from './slots.service';

@Controller('parking/slots')
export class SlotsController {
    @Get()
    getAllParkingSlotsByColor(@Query('color') color: string): SlotRequest[] {
        if (color == undefined || color == "") {
            return SlotSvc.get();
        }
        return SlotSvc.getByColor(color);
    }

    @Post()
    createParkingSlot(@Body() request: SlotRequest): SlotResponse {
        return SlotSvc.allocate(request);
    }

    @Delete(':id')
    freeParkingSlot(@Param('id') id: number) {
        SlotSvc.free(id);
        ParkingSvc.add(id);
        return id;
    }
}
