import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[UsersModule],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
