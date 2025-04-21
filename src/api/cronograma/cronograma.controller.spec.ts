import { Test, TestingModule } from '@nestjs/testing';
import { CronogramaController } from './cronograma.controller';

describe('CronogramaController', () => {
  let controller: CronogramaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronogramaController],
    }).compile();

    controller = module.get<CronogramaController>(CronogramaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
