import { Body, Injectable } from '@nestjs/common';
import { Puestos } from '../interfaces/puestos.interface';
import { CreatePuestosDto } from '../interfaces/puestos.interface';
import { PrismaService } from 'src/database/services/prisma.service';
import { Tipo_Puesto} from '@prisma/client';

/*

ESTO SOLO ES PARA GUARDAR LA TABLA PUESTOS

*/

@Injectable()
export class PuestosService {
    constructor(private prisma: PrismaService) { }
    private readonly puestos: CreatePuestosDto[] = []

    create(tipoPuesto: CreatePuestosDto) {
        return this.prisma.tipo_Puesto.create({
            data: {
                idEmpresa: null,
                nombreTipo: tipoPuesto.name,
                objetivo: null,
                funcionesPrincipales: null,
                competencias: null,
                educacion: null,
                experienciaLaboral: null,
                habilidadeEspecificas: null,
                factoresAmbientalesyFisicos: null,
                informacionEspecifica: null,
                departamento: tipoPuesto.areaOrDepartament,
                codigoOcupacion: tipoPuesto.occupationCode,
                jornadaLaboral: tipoPuesto.workday,
                resumenJornada: null,
                tipoPuestoJefe: null,  
                contractOptionalDefaultClauses: null,
                contractCustomClauses: null,
                tiempoParcial: null,
                codigoOcupacionMintrab: null,
            }
        })
    }

    getAll(): Promise<Tipo_Puesto[]> {
        return this.prisma.tipo_Puesto.findMany()
    }
}
