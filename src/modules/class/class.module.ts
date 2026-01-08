import { classSchema } from './../../schemas/class.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';


@Module({
  imports:[MongooseModule.forFeature([{name: "class",schema:classSchema}])],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
