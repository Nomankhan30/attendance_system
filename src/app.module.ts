import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import {MongooseModule} from "@nestjs/mongoose"
import {ConfigModule, ConfigService} from '@nestjs/config'
import { UsersController } from './modules/users/users.controller';
import { TeachersModule } from './modules/teachers/teachers.module';
import { ClassModule } from './modules/class/class.module';
import { StudentsModule } from './modules/students/students.module';
@Module({
  //LOAD ENV VAR
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),
  //USE MONGO URL FROM ENV TO MAKE DB CONNECTION 
  MongooseModule.forRootAsync({
    inject:[ConfigService],
    useFactory:(config:ConfigService)=>({
      //config obj of ConfigService type will get our env variable MONGO_URL
      //WE EXPECT A STRING TO BE RETURNED FROM MONGO_URL ENV
      //OR MORE PRECISELY, RETURN BY CONFIG.GET
      // Informs TypeScript that the value returned by config.get("MONGO_URL") is a string
      uri:config.get<string>("MONGO_URL")
    })
  }),
  AuthModule,
  UsersModule,
  TeachersModule,
  ClassModule,
StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
