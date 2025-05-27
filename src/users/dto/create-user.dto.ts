import {
    IsString,
    IsEmail,
    IsOptional,
    IsDateString,
    IsStrongPassword,
    IsPhoneNumber,
} from 'class-validator';


export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({}, {
        message: 'A senha precisa conter ao menos 8 caracteres, uma letra maiúscula, uma minúscula, um número e um símbolo.'
    })
    password: string;

    @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
    phone: string;

    @IsDateString()
    birth: string;

    @IsOptional()
    @IsString()
    registration?: string;

    @IsOptional()
    @IsDateString()
    createdAt?: Date;

    @IsOptional()
    @IsDateString()
    updatedAt?: Date;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}