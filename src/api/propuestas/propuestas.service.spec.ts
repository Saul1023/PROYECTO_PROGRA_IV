import { Test, TestingModule } from '@nestjs/testing';
import { PropuestasService } from './propuestas.service';

describe('PropuestasService', () => {
  let service: PropuestasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropuestasService],
    }).compile();

    service = module.get<PropuestasService>(PropuestasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
