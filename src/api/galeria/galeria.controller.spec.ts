import { Test, TestingModule } from '@nestjs/testing';
import { GaleriaController } from './galeria.controller';

describe('GaleriaController', () => {
  let controller: GaleriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GaleriaController],
    }).compile();

    controller = module.get<GaleriaController>(GaleriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
