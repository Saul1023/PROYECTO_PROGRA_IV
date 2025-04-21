import { Test, TestingModule } from '@nestjs/testing';
import { VotacionController } from './votacion.controller';

describe('VotacionController', () => {
  let controller: VotacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotacionController],
    }).compile();

    controller = module.get<VotacionController>(VotacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
