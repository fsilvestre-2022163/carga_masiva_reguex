import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, Max, MaxLength, maxLength, Min, Validate } from "class-validator"
import { Type } from 'class-transformer';


export class CreateCentroDeTrabjoDto{
    @IsString()
    @IsNotEmpty()
    nameWorkCenter: string

    @IsString()
    @IsNotEmpty()
    departament: string

    @IsString()
    @IsNotEmpty()
    municipalty: string

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number) 
    idDepartament: number

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number) 
    idMunicipalty: number

    @IsNumber()
    @Min(1)
    @Max(25)
    @IsNotEmpty()
    @Type(() => Number) // Esta línea fuerza la conversión a número
    zone: number;
    
    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    workCenterContact: string

    @IsString()
    @Length(8, 8)
    @Matches(/^[0-9]{8}$/)
    @IsNotEmpty()
    contactPhone: string

    @IsEmail()
    @IsNotEmpty()
    emailContact: string
}

export interface CentroDeTrabajos {
    nameCenterWork: string
    departament: string
    municipality: string
    zone: number
    address: string
    workCenterContact: number
    contactPhone: number
    emailContact: string
}
