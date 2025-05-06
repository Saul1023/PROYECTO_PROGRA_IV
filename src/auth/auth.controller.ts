import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/api/users/users.service';
import { SingInDto } from './dto/signIng.dto';
import { CreateUserDto } from 'src/api/users/dto/create.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService,
        private readonly userService:UsersService,
    ){}

    @Post('login')
    singIn(@Body() {ci,password}:SingInDto){
        console.log("88");
        return this.authService.signIn(ci, password);
    }
    @Post('create')
    create(@Body() user: CreateUserDto) {{
        return this.userService.add(user);
    }}
}