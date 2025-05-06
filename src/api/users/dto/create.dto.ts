import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(5, 15)
  ci: string;

  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  rol: string;
}
