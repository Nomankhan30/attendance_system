import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    login(username:string,password:string){
        return ("LOGIN FUNCTION WORKING CORRECTLY")
    }
}
