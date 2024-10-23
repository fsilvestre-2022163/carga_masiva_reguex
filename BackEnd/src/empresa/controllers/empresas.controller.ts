import { Controller, Get } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';

@Controller('empresas')
export class EmpresasController {
    constructor(private empresaService: EmpresasService) { 
    }

    @Get()
    async findAll(): Promise<any[]> {
        return this.empresaService.findAll();
    }

}
