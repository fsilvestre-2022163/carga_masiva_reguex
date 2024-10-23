import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { GetEmpresasDto } from '../interfaces/empresas.interface';


@Injectable()
export class EmpresasService {
    constructor(private prisma: PrismaService) { }
    private readonly empresas: GetEmpresasDto[] = []

   /* getAll(): Promise<empresa[]> {
        return this.prisma.empresa.findMany()
    }*/
     findAll(){
        return  this.prisma.empresa.findMany({
            select: {
                id: true,
                nombreComercialEmpresa: true
            }
        })
    }
    
}
