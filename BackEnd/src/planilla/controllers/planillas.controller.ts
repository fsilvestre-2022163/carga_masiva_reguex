import { Controller, Post, Get, Body } from '@nestjs/common';
import { Planillas } from '../interfaces/planillas.interface';
import { PlanillasService } from '../services/planillas.service';
import { CreatePlanillasDto } from '../interfaces/planillas.interface';

@Controller('planillas')
export class PlanillasController {
    // constructor(private planillasService: PlanillasService) {
    // }

    // @Post()
    // async create(@Body() planillas: CreatePlanillasDto) {
    //     return this.planillasService.create(planillas);
    // }

    // @Get()
    // async getAll(): Promise<any[]> {
    //     return this.planillasService.getAll();
    // }
}
