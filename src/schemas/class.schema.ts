import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import {HydratedDocument} from "mongoose"
import {Types}  from "mongoose"
export type classDocument=HydratedDocument<myClass>
@Schema()
export class myClass{
    @Prop()
    className:string
    //Without ref, populate/join will NOT work.
    @Prop({type:Types.ObjectId, ref:"User",required:true})
    teacherId:Types.ObjectId

    @Prop({type:[Types.ObjectId],ref:"User",required:true})
    studentIds:[Types.ObjectId]
}

export const classSchema=SchemaFactory.createForClass(myClass)