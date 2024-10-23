import { Controller, Post, Body, Get } from '@nestjs/common';
import { CentroDeTrabajoService } from '../services/centro-de-trabajo.service';
import { CentroDeTrabajos } from '../interfaces/centro-de-trabajos.interface';
import { CreateCentroDeTrabjoDto } from '../interfaces/centro-de-trabajos.interface';
@Controller('centro-de-trabajo')
export class CentroDeTrabajoController {
    // constructor(private centroDeTrabajoService: CentroDeTrabajoService) {
    // }

    // @Post()
    // async create(@Body() centroDeTrabajo: CreateCentroDeTrabjoDto) {
    //     return this.centroDeTrabajoService.create(centroDeTrabajo);
    // }

    // @Get()
    // async findAll(): Promise<any[]> {
    //     return this.centroDeTrabajoService.findAll()
    // }

}
