import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import {HydratedDocument} from "mongoose"
import {Types} from "mongoose"
export type attendanceDocument=HydratedDocument<classAttendance>
@Schema()
export class classAttendance{
    @Prop({type:Types.ObjectId,ref:"Class"})
    classId:Types.ObjectId

    @Prop({type:Types.ObjectId, ref:"Student",required:true})
    studentId:Types.ObjectId

    @Prop({required:true})
    status: "present"|"absent"
}

export const classAttendanceSchema=SchemaFactory.createForClass(classAttendance)