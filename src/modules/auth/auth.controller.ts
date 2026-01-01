import { Body, Controller,Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(){}
  @Get("login")
  login(){
    return {
        message:"GAME OVER FOR DEVS"
    }

  }

}
