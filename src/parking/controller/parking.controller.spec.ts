import { HttpStatus, Res } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { SlotService } from '../../slot/service/slot.service';
import { ParkingRequest } from '../dto/parking.dto';
import { ParkingService } from '../service/parking.service';
import { ParkingController } from './parking.controller';

describe('ParkingController', () => {
  let controller: ParkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParkingController],
      providers: [ParkingService, SlotService]
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to return parking slots', () => {
    const response: Partial<Response> = {
      status: (function (status) {
        this.status = HttpStatus.OK
        return this;
      }),

      json: function (body) {
        this.body = {}
        return this;
      },
    }

    let res = controller.getParkings(response as Response);
    expect(res.status).toBe(HttpStatus.OK)
  });

  it('should be able to update the parking slots', () => {
    const response: Partial<Response> = {
      status: (function (status) {
        this.status = HttpStatus.OK
        return this;
      }),

      json: function (body) {
        this.body = {}
        return this;
      },
    }

    let res = controller.updateParkings(new ParkingRequest("finmo", 10), response as Response);
    expect(res.status).toBe(HttpStatus.OK)
  });
});
