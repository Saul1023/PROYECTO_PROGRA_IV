import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePropuestaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  candidatoId: string;
}
