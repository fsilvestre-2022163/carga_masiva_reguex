import { Injectable, Res } from '@nestjs/common';
import { Centro } from '@prisma/client';
import { CentroDeTrabajos } from '../interfaces/centro-de-trabajos.interface';
import { CreateCentroDeTrabjoDto } from '../interfaces/centro-de-trabajos.interface';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/services/prisma.service';

/*

ESTO SOLO ES PARA GUARDAR LA TABLA CENTRO DE TRABAJO

*/

@Injectable()
export class CentroDeTrabajoService {
    constructor(private prisma: PrismaService) { }
    private readonly centroDeTrabajos: CreateCentroDeTrabjoDto[] = []

    create(centroDeTrabajo: CreateCentroDeTrabjoDto) {
        return this.prisma.centro.create({
            data: {
                nombreCentro: centroDeTrabajo.nameWorkCenter,
                direccionCentro: centroDeTrabajo.address,
                zona: Number(centroDeTrabajo.zone), // Conversión a número
                telefonosCentro: centroDeTrabajo.contactPhone,
                faxCentro: null,
                nombreContactoCentro: centroDeTrabajo.workCenterContact,
                correoCentro: centroDeTrabajo.emailContact,
                departamentoCentro: Number(centroDeTrabajo.idDepartament),
                municipioCentro: Number(centroDeTrabajo.idMunicipalty),
                codigoActividadEconomica: null,
                idEmpresa: null,
                correlativo: 0,
            }
        })
    }

    findAll(): Promise<Centro[]> {
        return this.prisma.centro.findMany()
    }

}
