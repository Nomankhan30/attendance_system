import { Body, Controller,Get, UsePipes,Post, UseGuards,Res,Req } from '@nestjs/common';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import type { CreateLoginDto} from './dto/login.dto';
import {loginSchema}  from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../../common/guards/jwt.auth.guard';
import type { Response } from 'express';
import type { CreateUserDto } from '../users/dto/create-user.dto';
//go one folder up from current folder
import { CreateUserSchema } from '../users/dto/create-user.dto';
import { User } from 'src/common/decorators/user.decorator';
import type{ jwtUserPayload } from '../../common/interfaces/jwt.payload.interface';
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService:AuthService ){}
  //get active user details
  @Get("me")
  @UseGuards(AuthGuard)
  async getdetails(@User() user:jwtUserPayload){
    const userData=user
    //just for now, logiv must be in service
    // return({success:true,
    //   data:{
    //     User
    //   }
    // })
    //passing document id
    return this.AuthService.getdetails(userData.sub)
  }
     
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  @Post("Signup")
  async signup(@Body() body:CreateUserDto){
    return this.AuthService.signup(body)

  }
@Post("login")
//guard checks request valid or not
//@UseGuards(AuthGuard)
//body will be checked against loginSchema
@UsePipes(new ZodValidationPipe(loginSchema))
async login(@Res({passthrough:true}) res:Response, @Body() body:CreateLoginDto){
  //debugger;
  const {access_token}=await this.AuthService.login(body)  
  res.cookie('access_token',access_token,{
            httpOnly:true,
            sameSite:true,
            secure:true
        })
   
}
}
