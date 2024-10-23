import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, ValidateNested } from "class-validator"
import { ContractCustomClauseDto } from "./contractCustomClausesDto"
import { Type } from "class-transformer"

export class CreatePuestosDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    workday: string

    //Opcional para que no afecte a los datos ya existentes
    @IsString()
    @IsOptional()
    sumaryWorkday: string

    @IsString()
    @IsOptional()
    objetive: string

    @IsArray()
    @IsString({ each: true }) //Para cada elemento del array
    @IsOptional()

    mainFunctions: string[]

    @IsNumber()
    @IsOptional()
    contractOptionalDefaultClauses: number[]

    @IsString()
    @IsOptional()

    factoresAmbientalesyFisicos: string

    @IsString()
    @IsOptional()

    informacionEspecifica: string

    @IsString()
    @IsOptional()
    habilidadesEspecificas: string

    @IsOptional()
    @IsString()
    tipoPuestoJefe: string

    @IsArray()
    @ValidateNested({ each: true })  // Valida cada objeto dentro del array
    @Type(() => ContractCustomClauseDto)
    @IsOptional()
    contractCustomClauses: ContractCustomClauseDto[] = []

    // @IsBoolean()
    // @IsOptional()
    // @Matches(/^(true|false)$/)
    // partTime: boolean
    @IsNumber()
    @IsOptional()
    partTime: number
    //---------------------------------------------------

    @IsString()
    @IsNotEmpty()
    areaOrDepartament: string

    @IsString()
    @Length(3, 4)
    @Matches(/^[0-9]{3,4}$/)
    @IsNotEmpty()
    occupationCode: string

    @IsString()
    @IsNotEmpty()
    occupation: string
}

export interface Puestos {
    name: string
    workday: string
    areaOrDepartament: string
    occupationCode: number
    occupation: string
}
