import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose"
import {HydratedDocument} from "mongoose"
export type userDocument=HydratedDocument<User>
@Schema()
export class User{
    @Prop()
    name:string

    @Prop({required:true})
    email:string

    @Prop({required:true})
    password:string

    @Prop()
    role:"teacher"|"student"

}

export const userSchema=SchemaFactory.createForClass(User)