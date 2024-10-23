import { Test, TestingModule } from '@nestjs/testing';
import { PlanillasService } from './planillas.service';

describe('PlanillasService', () => {
  let service: PlanillasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanillasService],
    }).compile();

    service = module.get<PlanillasService>(PlanillasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
