import { IsString, IsNotEmpty } from "class-validator";

export class CreateVotacionDto {
  @IsString()
  @IsNotEmpty()
  candidatoId: string;
}
