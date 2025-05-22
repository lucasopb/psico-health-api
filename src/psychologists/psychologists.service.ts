import { Injectable } from "@nestjs/common";
import { Psychologist } from "./entities/psychologists.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from "argon2";
import { CreatePsychologistDto } from "./dto/create-psychologist.dto";

@Injectable()
export class PsychologistsService {
    constructor(
        @InjectRepository(Psychologist)
        private psychologistsRepository: Repository<Psychologist>,
    ) { }

    async create(createPsychologistDto: CreatePsychologistDto) {
        const psychologist = this.psychologistsRepository.create(createPsychologistDto);
        return await this.psychologistsRepository.save(psychologist);
    }

    async findAll() {
        return await this.psychologistsRepository.find();
    }

    async findOne(id: string) {
        const psychologist = await this.psychologistsRepository.findOne({ where: { id } });

        if (!psychologist) {
            throw new Error("Psychologist not found");
        }

        return psychologist;
    }

    async findByEmail(email: string) {
        const psychologist = await this.psychologistsRepository.findOne({ where: { email } });

        if (!psychologist) {
            throw new Error("Psychologist not found");
        }

        return psychologist;
    }

    async update(id: string, updatePsychologistDto: CreatePsychologistDto) {
        const psychologist = await this.findOne(id);
        if (updatePsychologistDto.password) {
            updatePsychologistDto.password = await argon2.hash(updatePsychologistDto.password);
        }
        return this.psychologistsRepository.save({ ...psychologist, ...updatePsychologistDto });
    }

    async remove(id: string) {
        const psychologist = await this.findOne(id);
        return this.psychologistsRepository.remove(psychologist);
    }

}