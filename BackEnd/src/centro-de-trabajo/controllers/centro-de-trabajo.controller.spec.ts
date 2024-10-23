import { Test, TestingModule } from '@nestjs/testing';
import { CentroDeTrabajoController } from './centro-de-trabajo.controller';

describe('CentroDeTrabajoController', () => {
  let controller: CentroDeTrabajoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentroDeTrabajoController],
    }).compile();

    controller = module.get<CentroDeTrabajoController>(CentroDeTrabajoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
