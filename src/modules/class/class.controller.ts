import { classSchema } from './dto/class.dto';
import { Controller, UseGuards, UsePipes,Body,Post,Get,Param } from '@nestjs/common';
import { ClassService } from './class.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { AuthGuard } from 'src/common/guards/jwt.auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import type { classDto } from './dto/class.dto';
import { User } from 'src/common/decorators/user.decorator';
import { addStudentSchema } from './dto/add-student.dto';
import type {addStudentDto} from './dto/add-student.dto';
import type{ jwtUserPayload } from 'src/common/interfaces/jwt.payload.interface';
import type{ classIdDto } from './dto/classId.dto';
import { classIdSchema } from './dto/classId.dto';
@Controller('class')
@UseGuards(AuthGuard,RoleGuard)
//using pipe at parameter level will run it twice
//since we have two parameters
//@UsePipes(new ZodValidationPipe(classSchema))

export class ClassController {
    constructor(private readonly classService:ClassService){}
    @Post(":classId/add-student")
    //extracting and validatig whole object "{studentId:123 or any other Id}" in param
    //not extracting just id like "123" else validation obj will not match
    addStudentToClass(@User() user:jwtUserPayload,@Body(new ZodValidationPipe(addStudentSchema)) stuid:addStudentDto,@Param(new ZodValidationPipe(classIdSchema)) classId:classIdDto){
        //return "HI"
        return this.classService.addStudentToClass(user,stuid,classId)
    }

    @Post()
    classDetails(@Body(new ZodValidationPipe(classSchema)) className:classDto,@User() user){
        return this.classService.classDetails(className.className,user)
    }
}
