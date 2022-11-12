import { Body, Controller, Delete, Get, Param, Post, HttpStatus, Query, Res, HttpCode } from '@nestjs/common';
import { SlotRequest, SlotResponse } from 'src/slot/dto/slot.dto';

import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { ParkingService } from 'src/parking/service/parking.service';
import { SlotService } from '../service/slots.service';

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
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'returns when the slot is freed' })
    freeParkingSlot(@Param('id') id: number, @Res() res: Response) {
        this.slotService.freeSlot(Number(id));
        this.parkingService.addSlot(Number(id));
        res.status(HttpStatus.NO_CONTENT).send()
    }
}
