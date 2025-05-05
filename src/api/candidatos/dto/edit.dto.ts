import { IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { NewDto } from './new.dto';

export class EditDto extends PartialType(NewDto) {
  @IsString()
  @IsOptional()
  partidoId?: string;

  @IsString()
  @IsOptional()
  fechaNacimiento?: string;

}
