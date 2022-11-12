import { Body, Controller, Delete, Get, Param, Post, HttpStatus, Query, Res, HttpCode } from '@nestjs/common';
import { SlotRequest, SlotResponse } from 'src/parking/slots/slot.dto';
import { ParkingService } from '../parking.service';
import { SlotService } from './slots.service';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';

@Controller('parking/slots')
export class SlotsController {
    constructor(
        private slotService: SlotService,
        private parkingService: ParkingService) { }

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: SlotRequest, description: 'returns all the allocated slots or by color' })
    getAllParkingSlotsByColor(@Query('color') color: string, @Res() res: Response) {
        if (color == undefined || color == "") {
          res.status(HttpStatus.OK).json(this.slotService.getAllSlots());
          return;
        }
        res.status(HttpStatus.OK).json(this.slotService.getAllSlotsByColor(color));
    }

    @Post()
    @ApiResponse({ status: HttpStatus.OK, type: SlotResponse, description: 'returns the allocated slot id' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'return when the parking slot is full' })
    createParkingSlot(@Body() request: SlotRequest, @Res() res: Response) {
        if (!this.parkingService.isSlotAvailable()) {
            res.status(HttpStatus.NOT_FOUND).json({ error_message: "no parking slot available" })
            return
        }
        res.status(HttpStatus.OK).json(this.slotService.allocateSlot(request));
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.OK, description: 'returns when the slot is freed' })
    freeParkingSlot(@Param('id') id: number, @Res() res: Response) {
        this.slotService.freeSlot(id);
        this.parkingService.addSlot(id);
        res.status(HttpStatus.OK)
    }
}
