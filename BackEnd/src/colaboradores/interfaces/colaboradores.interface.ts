import { IsDate, IsEmail, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches } from "class-validator"
import { Type } from "class-transformer"

export class CreateColaboradoresDto {
    @IsString()
    @IsNotEmpty()
    plazaId: string

    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    secondName: string

    @IsString()
    @IsNotEmpty()
    otherName: string

    @IsString()
    @IsNotEmpty()
    firstSurname: string

    @IsString()
    @IsNotEmpty()
    secondSurname: string

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    birthdate: Date

    @IsString()
    @Length(13, 13)
    @Matches(/^[0-9]{13}$/)
    @IsNotEmpty()
    DPI: string

    @IsString()
    @IsNotEmpty()
    @IsIn(['Masculino', 'Femenino'])
    gender: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    planilla: string

    @IsString()
    @IsNotEmpty()
    workCenter: string

    @IsString()
    @IsNotEmpty()
    jobPosition: string

    @IsNumberString()
    @IsOptional()
    currentBaseSalary: string

    @IsNumberString()
    @IsNotEmpty()
    bonus: number

    @IsString()
    @IsNotEmpty()
    @IsIn(['Depósito', 'Cheque', 'Transferencia'])
    methodOfPayment: string

    @IsNumberString()
    @IsOptional()
    bank:number

    @IsString()
    @IsOptional()
    @IsIn(['Ahorro', 'Monetaria'])
    typeAccount: string

    @IsNumberString()
    @IsOptional()
    accountNumber:number

    @IsString()
    @IsNotEmpty()
    typeContract: string

    @IsDate()
    @Type(() => Date)
    jobStartDate: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    dateEndContract: Date

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    jobEndDate: Date
}

export interface Colaboradores {
    plazaId: number
    firstName: string
    secondName: string
    otherName: string
    firstSurname: string
    secondSurname: string
    birthdate: Date
    DPI: number
    email: string
    planilla: string
    workCenter: string
    jobPosition: string
    currentBaseSalary: number
    bonus: number
    typeContract: string
    dateEndContract: Date
}
