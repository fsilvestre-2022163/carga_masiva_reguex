import { Controller,  Get, Post, Body } from '@nestjs/common';
import { Puestos } from '../interfaces/puestos.interface';
import { PuestosService } from '../services/puestos.service';
import { CreatePuestosDto } from '../interfaces/puestos.interface';

@Controller('puestos')
export class PuestosController {
    // constructor (private  puestosService: PuestosService) {
    // }

    // @Post()
    // async create(@Body() puestos: CreatePuestosDto){
    //     return this.puestosService.create(puestos);
    // }

    // @Get()
    // async getAll():  Promise<any[]> {
    //     return this.puestosService.getAll();
    // }


}
