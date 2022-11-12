import { Controller, Get } from '@nestjs/common';

@Controller('parking')
export class ParkingController {
    @Get()
    getHello(): string {
      return  "Hello Parking"
    }
}
