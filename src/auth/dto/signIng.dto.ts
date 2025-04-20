import { IsEmail, IsString, Length } from "class-validator";

export class SingInDto{
    @IsEmail()
    email:string;

    @IsString()
    @Length(8,30)
    password:string;
}