import { Test, TestingModule } from '@nestjs/testing';
import { SlotsController } from 'src/slot/controller/slots.controller';


describe('SlotsController', () => {
  let controller: SlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotsController],
    }).compile();

    controller = module.get<SlotsController>(SlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
