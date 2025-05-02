import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class NewCronogramaDto {
  @IsString()
  @IsNotEmpty()
  actividad: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: Date;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  candidatoId?: string;
}
