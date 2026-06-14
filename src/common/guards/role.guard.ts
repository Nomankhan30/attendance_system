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
import { Reflector } from "@nestjs/core";
import { Role } from "../enums/role.enums";
import {ROLES_KEY } from "../decorators/roles.decorator";
 @Injectable()
 export class RoleGuard implements CanActivate{
    //inject jwt instance via constructor
    //constructor(@InjectModel("user") userModel:Model<User>){}
    //constructor(@InjectModel("user") userModel:Model<User>){}
    constructor(private reflector: Reflector){}
    async canActivate(context:ExecutionContext):Promise<boolean>{  
      //getAllAndOverride: This function collects roles from both controller and method, then applies “method overrides controller” rule to decide final required roles.
//       Controller roles = default rules
// Method roles     = specific rules
// getAllAndOverride = smart merger + override system
//getAllAndOverride reads metadata from route class and route handler, and since we setting that meta data in array form in roles.decorator hence it will read an array so we are returning an array whom will we call Roles to reuiredRoles variable
//More accurate wording in learning.md
const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    //THIS IF IS FOR ROUTES WHICH ARE AVAILABLE FOR ALL ROLES, NO RESTRICTION
    //SO RETURN TRUE 
    if (!requiredRoles) {
      return true; 
    }
    // if req.user
        const {user}=context.switchToHttp().getRequest()
        //some → Does any item satisfy this condition?
        return requiredRoles.some((role)=>user.role===role)
    }
    

 }