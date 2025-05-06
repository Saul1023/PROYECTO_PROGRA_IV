import { IsString, IsNotEmpty, IsMongoId, IsDate, IsDateString, IsOptional } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateVotacionDto {
  @IsNotEmpty()
  @IsMongoId()
  presidenteId: string;

  @IsNotEmpty()
  @IsMongoId()
  vicepresidenteId: string;

  @IsNotEmpty()
  @IsString()
  ci: string; 

  @IsNotEmpty()
  @IsDateString()
  fechaVoto: string;

  @IsOptional()
  @IsString()
  partidoId: string;
}