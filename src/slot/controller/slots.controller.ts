import { Body, Controller, Delete, Get, Param, Post, HttpStatus, Query, Res, HttpCode } from '@nestjs/common';

import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';
import { SlotService } from '../service/slot.service';
import { ParkingService } from '../../parking/service/parking.service';
import { SlotErrorCode, SlotRequest, SlotResponse } from '../dto/slot.dto';

@Controller('parking/slots')
export class SlotsController {
    constructor(
        public slotService: SlotService,
        public parkingService: ParkingService) { }

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
    @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY, description: 'return when the parking slot is full or same registration vehicle exist' })
    createParkingSlot(@Body() request: SlotRequest, @Res() res: Response) {
        let [slotRes, error] = this.slotService.allocateSlot(request);
        if(error == SlotErrorCode.FULL){
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error_message: "no parking slot available" })
            return
        }

        if(error == SlotErrorCode.EXISTS){
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ error_message: "parking with same registration number exists" })
            return
        }

        res.status(HttpStatus.OK).json(slotRes);
    }

    @Delete(':id')
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'returns when the slot is freed' })
    freeParkingSlot(@Param('id') id: number, @Res() res: Response) {
        this.slotService.freeSlot(Number(id));
        this.parkingService.addSlot(Number(id));
        res.status(HttpStatus.NO_CONTENT).send()
    }
}
