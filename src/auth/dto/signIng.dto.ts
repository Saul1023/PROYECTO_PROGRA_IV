import { IsEmail, IsString, Length } from "class-validator";

export class SingInDto{
    @IsString()
    @Length(5, 15) 
    ci: string;

    @IsString()
    @Length(8, 30)
    password: string;
}