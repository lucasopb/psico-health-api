import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "src/auth/auth.guard";

@ApiTags("users")
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        const user = await this.usersService.create(createUserDto);
        return { message: 'User created sucessfully', user };
    }

    @UseGuards(AuthGuard)
    @Get()
    async findAll() {
        const users = await this.usersService.findAll();
        return users;
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.usersService.findOne(id);
        return user;
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
        const user = await this.usersService.update(id, updateUserDto);
        return { message: 'User updated sucessfully', user };
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async remove(@Param('id') id: string) {
        const user = await this.usersService.remove(id);
        return { message: 'User removed sucessfully', user };
    }


};