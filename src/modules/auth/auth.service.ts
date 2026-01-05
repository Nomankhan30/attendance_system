import { UsersService } from './../users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { jwtUserPayload } from 'src/common/interfaces/jwt.payload.interface';
import {Types} from 'mongoose';
@Injectable()
export class AuthService {
    //Imp:Model instance is injected
    //Nest injects “user” 
    // Model(which was created from userSchema)
    // INSTANCE due to @InjectModel('user') 
    // and assigns it to userModel or 
    // In other words, userModel is holding that
    //  instance(which was injected).
    
    constructor(@InjectModel("user") private userModel:Model<User>,private readonly jwtService:JwtService,private readonly UserService:UsersService){}
    async signup(reqBody:CreateUserDto){
        debugger;
        const user=await this.userModel.exists({email:reqBody.email})
        //if find() is used, user will always be truthy
        // cause incase of no result truthy value
        //like [] will be returned,use exists instead
        if(user){
            return ("EMAIL IS ALREADY REGISTERED")
        }
        const hashpass=await bcrypt.hash(reqBody.password,11)
        //else save user and signup
        const newUser=await this.userModel.create({
            name:reqBody.name,
            email:reqBody.email,
            password:hashpass,
            role:"student"

        })
        const result=await newUser.save()
        return({msg:"SignUp Completed Successfully 🥳",data:result})
        //const result=await newUser.save()
    }
    async login(reqBody:CreateLoginDto){
        const {email,password}=reqBody 
        const user=await this.userModel.findOne({email})
        if (!user){
            return {msg:"User Not Found"}
        }
        const access_token=await this.jwtService.signAsync({sub:user._id,username:user.name})
        return{
            access_token:access_token
           }
    }
    async getdetails(id:Types.ObjectId){
        //if user exists so doc obj returned
        //else null
        const user=await this.userModel.findById(id)
            if (!user){
                throw new NotFoundException("User Not Found")
            }
            const {_id,name,email,role}=user
            return{
                sucess:true,
                data:{
                    _id,
                    name,
                    email,
                    role,

                }
            }
        
    }
}
