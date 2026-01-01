import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose"
import {User} from "../../schemas/user.schema"
import {CreateUserDto} from "./dto/create-user.dto"
@Injectable()
export class UsersService {
    //making user model available here
    //from schema  "user"
    //"user" name is registered in users.module.ts for userSchema
    constructor(@InjectModel("user") private userModel:Model<User>){}
    async create(createUserDto:CreateUserDto){
        const newUser=new this.userModel(createUserDto)
        const result=await newUser.save()
        console.log("My RESULT FROM CREATE USER",result)
        return result
    }
}
