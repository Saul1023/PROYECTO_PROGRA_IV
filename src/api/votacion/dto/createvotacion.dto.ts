import { IsString, IsNotEmpty, IsMongoId, IsDate, IsDateString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateVotacionDto {
  @IsNotEmpty()
  @IsMongoId()
  presidenteId: string;

  @IsNotEmpty()
  @IsMongoId()
  vicepresidenteId: string;

  @IsNotEmpty()
  @IsMongoId()
  usuarioId: string; // ID del usuario que vota

  @IsNotEmpty()
  @IsDateString()
  fechaVoto: string;
}