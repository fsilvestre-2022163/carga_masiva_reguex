import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { CreatePlanillasDto } from '../interfaces/planillas.interface';
import { Planilla } from '@prisma/client';

/*

ESTO SOLO ES PARA GUARDAR LA TABLA PLANILLA

*/

@Injectable()
export class PlanillasService {
    // constructor(private prisma: PrismaService) { }
    // private readonly planillas: CreatePlanillasDto[] = []

    // create(planillas: CreatePlanillasDto) {
    //     const paymentFrequencyNumber = parseInt(planillas.paymentFrequency.split(' ')[0], 10); //Esto pasa el "15 dias o 30 dias" a numero ya que en la base de datos está como Int

    //     return this.prisma.planilla.create({
    //         data: {

    //             idEmpresa: null,
    //             nombrePlanilla: planillas.name,
    //             frecuenciaPago: paymentFrequencyNumber, // Guardar solo el número
    //             sabadoSeptimo: Boolean(planillas.workSaturday), //En la base de datos es Int
    //             quincenaDeDieciseis: null,
    //             banco: null,
    //             numeroCuentaBanco: null,
    //             estado: 'Activa',
    //             codigoActividadEconomica: null,
    //             turnosRotativos: Boolean(planillas.rotatingShifts), //En la base de datps es Int
    //         }
    //     })

    // }

    // getAll(): Promise<Planilla[]> {
    //     return this.prisma.planilla.findMany()
    // }
}
