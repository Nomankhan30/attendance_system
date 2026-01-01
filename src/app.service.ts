import { UsersService } from './modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!!';
  }
}
