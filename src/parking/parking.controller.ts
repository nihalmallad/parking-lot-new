import { Body, Controller, Get, Put, Res, HttpStatus, Version } from '@nestjs/common';
import { Response } from 'express';
import { ParkingRequest, ParkingResponse } from "./parking.dto";
import { ParkingService } from './parking.service';
import { SlotService } from './slots/slots.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('parking')
export class ParkingController {
    constructor(
        private parkingService: ParkingService,
        private slotService: SlotService){}

    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: ParkingResponse, description: 'feth all the slots' })
    getParking(@Res() res: Response) {
        let resp = new ParkingResponse(
            this.parkingService.size() + this.slotService.size(),
            this.slotService.size(),
            this.parkingService.size())
        res.status(HttpStatus.OK).json(resp)
    }

    @Put()
    @ApiResponse({ status: HttpStatus.OK, type: ParkingResponse, description: 'returns the updated slots' })
    updateParking(@Body() request: ParkingRequest, @Res() res: Response) {
       res.status(HttpStatus.OK).json(this.parkingService.updateSlot(request));
    }
}
