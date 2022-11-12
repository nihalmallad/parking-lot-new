import { Body, Controller, Get, Post, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ParkingRequest, ParkingResponse } from "./parking.dto";
import { ParkingSvc } from './parking.service';
import { SlotSvc } from './slots/slots.service';

@Controller('parking')
export class ParkingController {
    @Get()
    getParking(@Res() res: Response) {
        let resp = new ParkingResponse(
            ParkingSvc.size() + SlotSvc.size(),
            SlotSvc.size(),
            ParkingSvc.size())
        res.status(HttpStatus.OK).json(resp)
    }

    @Put()
    updateParking(@Body() request: ParkingRequest): ParkingResponse {
        return ParkingSvc.update(request);
    }
}
