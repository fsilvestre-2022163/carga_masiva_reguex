import { Test, TestingModule } from '@nestjs/testing';
import { CentroDeTrabajoService } from './centro-de-trabajo.service';

describe('CentroDeTrabajoService', () => {
  let service: CentroDeTrabajoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentroDeTrabajoService],
    }).compile();

    service = module.get<CentroDeTrabajoService>(CentroDeTrabajoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
