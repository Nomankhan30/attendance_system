import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {userSchema} from '../../schemas/user.schema';
import {MongooseModule} from "@nestjs/mongoose"
@Module({
  //register particular schema with choice of your name
  imports:[MongooseModule.forFeature([{name: "user",schema:userSchema}])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
