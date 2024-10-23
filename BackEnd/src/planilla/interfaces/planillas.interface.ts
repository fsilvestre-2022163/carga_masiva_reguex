import { Type } from "class-transformer"
import { IsBoolean, IsBooleanString, IsIn, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

export class CreatePlanillasDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsIn(['15 días', '30 días'])
    @IsNotEmpty()
    paymentFrequency: string

    @IsBoolean()
    @Type(() => Boolean)
    @IsNotEmpty()
    rotatingShifts?: boolean


    @IsBoolean()
    @Type(() => Boolean)
    @IsNotEmpty()
    workSaturday?: boolean
}

export interface Planillas {
    name: string
    paymentFrequency: string
    rotatingShifts: string
    workSaturday: string
}
