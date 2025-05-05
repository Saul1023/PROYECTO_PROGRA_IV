import { IsString, IsDateString, IsUrl, IsBoolean, IsNotEmpty, IsOptional, IsInt } from 'class-validator';
import { Entity } from 'typeorm';

export class NewPartidoDto {
    @IsString()
    nombre: string;
  
    @IsString()
    lema: string;

    @IsOptional()
    @IsString()
    foto?: string;

    @IsOptional()
    @IsInt()
    estado?: number;
  
}   