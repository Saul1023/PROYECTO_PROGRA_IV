import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePropuestaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  fechaPropuesta: string; 

  @IsString()
  @IsNotEmpty()
  candidatoId: string;
}
