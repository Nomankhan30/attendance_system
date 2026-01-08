import { Injectable } from '@nestjs/common';
import { classDto } from './dto/class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { myClass } from '../../schemas/class.schema';
@Injectable()
export class ClassService {
    constructor(@InjectModel("class") private classModel:Model<myClass>){}
    async classDetails(className:string,user){
        const classDoc=await this.classModel.findOne({className:className})
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
