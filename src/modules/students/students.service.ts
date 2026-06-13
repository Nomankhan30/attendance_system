import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/common/decorators/user.decorator';
import { UsersService } from '../users/users.service';
@Injectable()
export class StudentsService {
    constructor(private readonly userService: UsersService){}
    async getAllStudents(user){
        return this.userService.getAllStudents((user))

    }
}
