import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Psychologist } from "./entities/psychologists.entity";
import { PsychologistsService } from "./psychologists.service";
import { PsychologistsController } from "./psychologists.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Psychologist])],
    controllers: [PsychologistsController],
    providers: [PsychologistsService],
    exports: [PsychologistsService],
})
export class PsychologistsModule { }