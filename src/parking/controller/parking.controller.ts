import { Body, Controller, Get, Put, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

import { ApiResponse } from '@nestjs/swagger';
import { ParkingService } from '../service/parking.service';

import { ParkingResponse, ParkingRequest } from '../dto/parking.dto';
import { SlotService } from '../../slot/service/slot.service';

@Controller('parking')
export class ParkingController {
    constructor(
        public parkingService: ParkingService,
        public slotService: SlotService){}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: ParkingResponse, description: 'feth all the slots' })
    getParkings(@Res() res: Response) {
        let resp = new ParkingResponse(
            this.parkingService.size() + this.slotService.size(),
            this.slotService.size(),
            this.parkingService.size())
        return res.status(HttpStatus.OK).json(resp)
    }

    @Put()
    @ApiResponse({ status: HttpStatus.OK, type: ParkingResponse, description: 'returns the updated slots' })
    updateParkings(@Body() request: ParkingRequest, @Res() res: Response) {
       return res.status(HttpStatus.OK).json(this.parkingService.updateSlot(request));
    }
}
