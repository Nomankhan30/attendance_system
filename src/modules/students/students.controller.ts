import { AuthGuard } from 'src/common/guards/jwt.auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { RoleGuard} from 'src/common/guards/role.guard';
import { Role } from 'src/common/enums/role.enums';
import { User } from 'src/common/decorators/user.decorator';
import { Get } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
@Controller('students')
@UseGuards(AuthGuard,RoleGuard) //order matters
//@Roles(Role.Student) //custom decorator to allow specific role only
export class StudentsController {
    constructor(private readonly studentsService: StudentsService){}
    @Roles(Role.Teacher)
    @Get()
    getAllStudents(@User() user){
        return this.studentsService.getAllStudents(user)
    }
}
