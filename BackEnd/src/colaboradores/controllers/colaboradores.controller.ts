import { Controller, Post, Body, Get } from '@nestjs/common';
import { ColaboradoresService } from '../services/colaboradores.service';
import { Colaboradores } from '../interfaces/colaboradores.interface';
import { CreateColaboradoresDto } from '../interfaces/colaboradores.interface';
@Controller('colaboradores')
export class ColaboradoresController {
    constructor(private colaboradorService: ColaboradoresService) {
    }

    // @Post()
    // async create(@Body() colaboradores: CreateColaboradoresDto) {
    //     return this.colaboradorService.create(colaboradores);
    // }


}
