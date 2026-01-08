//CHECK IF JWT EXISTS.
//IF EXISTS, VERIFY IT
import { CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
 } from "@nestjs/common";
 import { JwtService } from "@nestjs/jwt"; 
 @Injectable()
 export class AuthGuard implements CanActivate{
    //inject jwt instance via constructor
    constructor(private readonly jwtService:JwtService){}
    async canActivate(context:ExecutionContext):Promise<boolean>{
        // if req.user
        const request=context.switchToHttp().getRequest()
        const token=request.cookies.access_token
        if (!token){
            throw new UnauthorizedException()
        }
        try{
            const decodedPayload=await this.jwtService.verifyAsync(token,{secret:process.env.JWT_SECRET})
            //making decoded payload available in controller
            request.user=decodedPayload
            return true
        }
        catch(e){
            throw new UnauthorizedException("Invalid Token")
        }
    }
    

 }