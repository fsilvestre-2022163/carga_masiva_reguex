import { Controller, Post, Body, Get } from '@nestjs/common';
import { CargaMasivaService } from '../services/carga-masiva.service';

import { DatosCargaMasivaDto } from '../dto/carga-masiva.dto';

@Controller('carga-masiva')
export class CargaMasivaController {
    constructor(private cargaMasivaService: CargaMasivaService) {
    }

    @Post()
    async create(@Body() datos: DatosCargaMasivaDto): Promise<{ message: string }> {
        try {
            await this.cargaMasivaService.create(datos);
            return { message: 'Datos cargados exitosamente' };
        } catch (error) {
            // Manejo básico de errores 
            console.error('Error al crear datos:', error);
            throw new Error('Error al crear datos');
        }
    }


}
