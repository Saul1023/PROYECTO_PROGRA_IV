import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { NewGaleriaDto } from './newgaleria.dto';

export class EditGaleriaDto extends PartialType(NewGaleriaDto) {
  @IsOptional()
  @IsString()
  candidatoId?: string;
}
