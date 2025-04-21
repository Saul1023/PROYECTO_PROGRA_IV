import { Test, TestingModule } from '@nestjs/testing';
import { CronogramaService } from './cronograma.service';

describe('CronogramaService', () => {
  let service: CronogramaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronogramaService],
    }).compile();

    service = module.get<CronogramaService>(CronogramaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
