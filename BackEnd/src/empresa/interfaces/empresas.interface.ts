import { IsNotEmpty, IsString } from "class-validator";

export class GetEmpresasDto {
    @IsString()
    @IsNotEmpty()
    id: string

    @IsString()
    @IsNotEmpty()
    name: string
}
