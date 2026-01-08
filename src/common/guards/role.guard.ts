import {User} from "../../schemas/user.schema"
//CHECK IF JWT EXISTS.
//IF EXISTS, VERIFY IT
import { CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException
 } from "@nestjs/common";
 import { JwtService } from "@nestjs/jwt"; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
 @Injectable()
 export class RoleGuard implements CanActivate{
    //inject jwt instance via constructor
    //constructor(@InjectModel("user") userModel:Model<User>){}
    //constructor(@InjectModel("user") userModel:Model<User>){}
    async canActivate(context:ExecutionContext):Promise<boolean>{
        // if req.user
        const request=context.switchToHttp().getRequest()
        const user=request.user
        if (user?.role==="teacher"){
            return true
        }
        
        else{
            throw new NotFoundException("User Not Found")
        }
    }
    

 }