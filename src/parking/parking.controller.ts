import { Body, Controller, Get, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ParkingRequest, ParkingResponse } from "./parking.dto";
import { ParkingService } from './parking.service';
import { SlotService } from './slots/slots.service';

@Controller('parking')
export class ParkingController {
    constructor(
        private parkingService: ParkingService,
        private slotService: SlotService){}

    @Get()
    getParking(@Res() res: Response) {
        let resp = new ParkingResponse(
            this.parkingService.size() + this.slotService.size(),
            this.slotService.size(),
            this.parkingService.size())
        res.status(HttpStatus.OK).json(resp)
    }

    @Put()
    updateParking(@Body() request: ParkingRequest): ParkingResponse {
        return this.parkingService.update(request);
    }
}
