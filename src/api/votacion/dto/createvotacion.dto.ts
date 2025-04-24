import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreateVotacionDto {
  @IsString()
  @IsNotEmpty()
  candidatoId: string;

  @IsString()
  @IsNotEmpty()
  usuarioId: string; 

  @IsDateString()
  @IsNotEmpty()
  fechaVoto: string;
}
