import { IsBoolean, IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum Puesto {
  PRESIDENTE = 'presidente',
  VICEPRESIDENTE = 'vicepresidente',
}

export class NewDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsDateString()
  fechaNacimiento?: string;

  @IsString()
  @IsOptional()
  biografia?: string;

  @IsEnum(Puesto)
  @IsNotEmpty()
  puesto: Puesto;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  foto: string;

  @IsOptional()
  @IsInt()
  estado?: number;

  @IsString()
  @IsOptional()
  partidoId?: string;
}
