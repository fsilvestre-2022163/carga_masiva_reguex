import { Test, TestingModule } from '@nestjs/testing';
import { CargaMasivaService } from './carga-masiva.service';

describe('CargaMasivaService', () => {
  let service: CargaMasivaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CargaMasivaService],
    }).compile();

    service = module.get<CargaMasivaService>(CargaMasivaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
