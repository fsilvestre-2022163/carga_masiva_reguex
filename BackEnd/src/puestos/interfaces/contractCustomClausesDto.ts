import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class ContractCustomClauseDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    content: string;
}
