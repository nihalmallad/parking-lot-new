import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ParkingRequest, ParkingResponse } from "../dto/parking.dto";
import { ParkingSvc } from './parking.service';

@Controller('parking')
export class ParkingController {
    @Get()
    getParking(): number {
        // TODO: return the object
        return ParkingSvc.size();
    }

    @Post()
    createParking(@Body() request: ParkingRequest): ParkingResponse{
        return ParkingSvc.create(request);
    }

    @Put()
    updateParking(@Body() request: ParkingRequest): ParkingResponse {
        return ParkingSvc.update(request);
    }
}
