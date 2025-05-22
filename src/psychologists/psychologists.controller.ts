import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PsychologistsService } from "./psychologists.service";
import { CreatePsychologistDto } from "./dto/create-psychologist.dto";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("psychologists")
@ApiBearerAuth()
@Controller('psychologists')
export class PsychologistsController {
    constructor(private readonly psychologistsService: PsychologistsService) { }

    @Post()
    async create(@Body() createPsychologistDto: CreatePsychologistDto) {
        const psychologist = await this.psychologistsService.create(createPsychologistDto);
        return { message: 'Psychologist created sucessfully', psychologist };
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        const users = await this.psychologistsService.findAll();
        return users;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const psychologist = await this.psychologistsService.findOne(id);
        return psychologist;
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updatePsychologistDto: CreatePsychologistDto) {
        const psychologist = await this.psychologistsService.update(id, updatePsychologistDto);
        return { message: 'Psychologist updated sucessfully', psychologist };
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async remove(@Param('id') id: string) {
        const psychologist = await this.psychologistsService.remove(id);
        return { message: 'Psychologist removed sucessfully', psychologist };
    }


};