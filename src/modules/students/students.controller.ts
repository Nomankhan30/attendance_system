import { AuthGuard } from 'src/common/guards/jwt.auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { RoleGuard} from 'src/common/guards/role.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Get } from '@nestjs/common';
@Controller('students')
@UseGuards(AuthGuard,RoleGuard) //order matters
export class StudentsController {
    constructor(private readonly studentsService: StudentsService){}
    @Get()
    getAllStudents(@User() user){
        return this.studentsService.getAllStudents(user)
    }
}
