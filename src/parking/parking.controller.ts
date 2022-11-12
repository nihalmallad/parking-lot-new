import { Controller, Get, Post, Put } from '@nestjs/common';

@Controller('parking')
export class ParkingController {
    @Get()
    getParking(): string {
        return ""
    }

    @Post()
    createParking(): string {
        return "";
    }

    @Put()
    updateParking(): string {
        return ""
    }
}
