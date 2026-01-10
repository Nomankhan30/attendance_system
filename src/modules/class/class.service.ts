import { Injectable, NotFoundException } from '@nestjs/common';
import { classDto } from './dto/class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { myClass } from '../../schemas/class.schema';
import { BadRequestException } from '@nestjs/common';
import { jwtUserPayload } from 'src/common/interfaces/jwt.payload.interface';
import { addStudentDto } from './dto/add-student.dto';
import { classIdDto } from './dto/classId.dto';
@Injectable()
export class ClassService {
    constructor(@InjectModel("class") private classModel:Model<myClass>){}
    async addStudentToClass(user:jwtUserPayload,stuid:addStudentDto, classId:classIdDto){ 
        const id=user.sub
         //const Class=await this.classModel.findById(id)
         //If teacher owns the specified class, If student not already present THEN add student 
         //updateOne only updates first matching doc
         //$addToSet: not overwrites value, just push if value is new
         //updateOne() returns modifiedCount property 
         // which tells if doc is changed or not after update
         //classId=Param, studentId=body, teacherId=jwtPayload
         const result=await this.classModel.updateOne({_id:classId.classId,teacherId:id},
            
            {$addToSet:{studentIds:stuid.studentId}})
            if (result.matchedCount==0){
            throw new NotFoundException("Class not found or access denied");
                

        }
            if (result.modifiedCount==0){
            throw new BadRequestException("Student already exists");

        }
        return "STUDENT ADDED SUCCESSFULLY"
         

    }
    async classDetails(className:string,user){
        //add teacher id as well otherwise any teacher can access any classname
        const classDoc=await this.classModel.findOne({teacherId:user.sub,className:className})
        //if class with this course not exist Create
        //else Update
        if (!classDoc){
            //create does not only create but also saves doc
            //automatically
            const newClass=await this.classModel.create({
                className:className,
                teacherId:user.sub,
                studentIds:[]
            })
            return newClass
        }
        return classDoc
         
    }
}
