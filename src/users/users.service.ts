import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from "argon2";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createuserDto: CreateUserDto) {
        const user = this.usersRepository.create(createuserDto);
        return await this.usersRepository.save(user);
    }

    async findAll() {
        return await this.usersRepository.find();
    }

    async findOne(id: string) {
        const user = await this.usersRepository.findOne({ where: { id } });

        if (!user) {
            throw new Error("user not found");
        }

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error("user not found");
        }

        return user;
    }

    async update(id: string, updateUserDto: CreateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.password) {
            updateUserDto.password = await argon2.hash(updateUserDto.password);
        }
        return this.usersRepository.save({ ...user, ...updateUserDto });
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        return this.usersRepository.remove(user);
    }

}