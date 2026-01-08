import { classSchema } from './dto/class.dto';
import { Controller, UseGuards, UsePipes,Body,Post } from '@nestjs/common';
import { ClassService } from './class.service';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { AuthGuard } from 'src/common/guards/jwt.auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import type { classDto } from './dto/class.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('class')
@UseGuards(AuthGuard,RoleGuard)
//using pipe at parameter level will run it twice
//since we have two parameters
//@UsePipes(new ZodValidationPipe(classSchema))

export class ClassController {
    constructor(private readonly classService:ClassService){}
    @Post()
    classDetails(@Body(new ZodValidationPipe(classSchema)) className:classDto,@User() user){
        return this.classService.classDetails(className.className,user)
    }
}
