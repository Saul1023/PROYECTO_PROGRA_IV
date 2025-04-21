import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class NewGaleriaDto {
  @IsString()
  @IsNotEmpty()
  imagenUrl: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsDateString()
  fechaPublicacion: Date;

  @IsString()
  @IsNotEmpty()
  candidatoId: string;
}
