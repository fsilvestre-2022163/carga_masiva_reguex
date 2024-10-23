import { Module } from '@nestjs/common';
import { CargaMasivaController } from './controllers/carga-masiva.controller';
import { CargaMasivaService } from './services/carga-masiva.service';
import { DatabaseModule } from 'src/database/database.module';
import { ColaboradoresModule } from 'src/colaboradores/colaboradores.module';


@Module({
  controllers: [CargaMasivaController],
  providers: [CargaMasivaService],
  imports: [DatabaseModule, ColaboradoresModule]
})
export class CargaMasivaModule {}
