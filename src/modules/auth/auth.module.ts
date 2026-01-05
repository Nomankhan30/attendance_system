import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { userSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  //MongooseModule.forFeature([{name: "user",schema:userSchema}]) 
  // equivalent to mongoose.model('user', UserSchema)
  imports:[UsersModule,MongooseModule.forFeature([{name: "user",schema:userSchema}]),JwtModule.register({global:true,
    //global settings for all created tokens
    signOptions:{expiresIn:"10m"},
    secret:process.env.JWT_SECRET||"NOMAN123"})],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
