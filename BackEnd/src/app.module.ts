import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CargaMasivaModule } from './carga-masiva/carga-masiva.module';
import { CargaMasivaService } from './carga-masiva/services/carga-masiva.service';
import { CentroDeTrabajoModule } from './centro-de-trabajo/centro-de-trabajo.module';
import { PuestosModule } from './puestos/puestos.module';
import { ColaboradoresModule } from './colaboradores/colaboradores.module';
import { PlanillaModule } from './planilla/planilla.module';
import { DatabaseModule } from './database/database.module';
import { EmpresaModule } from './empresa/empresa.module';


@Module({
  imports: [CargaMasivaModule, CentroDeTrabajoModule,  PuestosModule, ColaboradoresModule, PlanillaModule, DatabaseModule, EmpresaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
