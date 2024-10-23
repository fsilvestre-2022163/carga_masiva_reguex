import { IntersectionType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { CreateCentroDeTrabjoDto } from "src/centro-de-trabajo/interfaces/centro-de-trabajos.interface";
import { CreateColaboradoresDto } from "src/colaboradores/interfaces/colaboradores.interface";
import { CreatePlanillasDto } from "src/planilla/interfaces/planillas.interface";
import { CreatePuestosDto } from "src/puestos/interfaces/puestos.interface";

export class DatosCargaMasivaDto {
    @IsString()
    @IsNotEmpty()
    idCompany: string;

    @IsArray()
    @Type(() => CreateCentroDeTrabjoDto)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    centroDeTrabajo: CreateCentroDeTrabjoDto[];

    @IsArray()
    @Type(() => CreateColaboradoresDto)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    colaboradores: CreateColaboradoresDto[];

    @IsArray()
    @Type(() => CreatePlanillasDto)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    planillas: CreatePlanillasDto[];

    @IsArray()
    @Type(() => CreatePuestosDto)
    @ValidateNested({ each: true })
    @IsNotEmpty()
    tipoPuestos: CreatePuestosDto[];
    
}