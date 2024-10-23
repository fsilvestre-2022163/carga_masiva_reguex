import { Test, TestingModule } from '@nestjs/testing';
import { CargaMasivaController } from './carga-masiva.controller';

describe('CargaMasivaController', () => {
  let controller: CargaMasivaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CargaMasivaController],
    }).compile();

    controller = module.get<CargaMasivaController>(CargaMasivaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
