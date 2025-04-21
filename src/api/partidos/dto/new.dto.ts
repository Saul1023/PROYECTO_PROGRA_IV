import { IsString, IsDateString, IsUrl, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { Entity } from 'typeorm';

export class NewPartidoDto {
    @IsString()
    nombre: string;
  
    @IsString()
    lema: string;
}