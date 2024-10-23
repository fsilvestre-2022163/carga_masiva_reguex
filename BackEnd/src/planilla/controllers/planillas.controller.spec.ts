import { Test, TestingModule } from '@nestjs/testing';
import { PlanillasController } from './planillas.controller';

describe('PlanillasController', () => {
  let controller: PlanillasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanillasController],
    }).compile();

    controller = module.get<PlanillasController>(PlanillasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
