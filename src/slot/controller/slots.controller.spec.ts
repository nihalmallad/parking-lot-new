import { HttpStatus, Res } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ParkingService } from '../../parking/service/parking.service';
import { SlotRequest } from '../dto/slot.dto';
import { SlotService } from '../service/slot.service';
import { SlotsController } from './slots.controller';
import { Response } from 'express';

describe('SlotsController', () => {
  let controller: SlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotsController],
      providers: [SlotService, ParkingService]
    }).compile();

    controller = module.get<SlotsController>(SlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to allocate the slots', () => {
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

    let res = controller.createParkingSlot(new SlotRequest("KA28Z1107", "green", "car"), response as Response);
    expect(res.status).toBe(HttpStatus.OK)
  });

  it('should be able to allocate the slots', () => {
    const response: Partial<Response> = {
      status: (function (status) {
        this.status = HttpStatus.NO_CONTENT
        return this;
      }),

      send: function (body) {
        this.body = {}
        return this;
      },
    }

    let res = controller.freeParkingSlot(1, response as Response);
    expect(res.status).toBe(HttpStatus.NO_CONTENT)
  });

  it('should be able to allocate the slots', () => {
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

    let res = controller.getAllParkingSlotsByColor("green", response as Response);
    expect(res.status).toBe(HttpStatus.OK)
  });

});
