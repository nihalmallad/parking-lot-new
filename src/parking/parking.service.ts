import { Injectable } from '@nestjs/common';
import { Parking, ParkingReq, ParkingResp } from './parking.interface';

@Injectable()
export class ParkingService implements Parking {
    add(slotId: number): void {
        throw new Error('Method not implemented.');
    }

    create(request: ParkingReq): ParkingResp {
        throw new Error('Method not implemented.');
    }
    
    update(request: ParkingReq): ParkingResp {
        throw new Error('Method not implemented.');
    }
    
    getSlot(): number {
        throw new Error('Method not implemented.');
    }
    
    size(): number {
        throw new Error('Method not implemented.');
    }
    
    isSlotAvailable(): boolean {
        throw new Error('Method not implemented.');
    }
}
