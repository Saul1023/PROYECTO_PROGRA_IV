import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
  @IsNotEmpty()
  fechaNacimiento: Date;

  @IsString()
  @IsOptional()
  biografia?: string;

  @IsEnum(Puesto)
  @IsNotEmpty()
  puesto: Puesto;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsString()
  @IsNotEmpty()
  partidoId: string;
}
