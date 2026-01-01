import { Controller,Post,Body,UsePipes } from '@nestjs/common';
import type { CreateUserDto} from './dto/create-user.dto';
import { CreateUserSchema } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Inject } from '@nestjs/common';
import { userSchema } from 'src/schemas/user.schema';
import { UsersService } from './users.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
@Controller("users")
export class  UsersController{
    constructor(private readonly usersService:UsersService){
        console.log("user controller constructor")
    }  
    @Post("createusers")
    //binding zod validation Pipe with create method
    @UsePipes(new ZodValidationPipe(CreateUserSchema))
    //if validation is passed so body is body data is forwarded  
    //defining body type for compile time safety
    create(@Body() body:CreateUserDto){
        //passing value to services create()
        return this.usersService.create(body)
    }   
}