import { Module } from '@nestjs/common';
import { EmpresasController } from './controllers/empresas.controller';
import { EmpresasService } from './services/empresas.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService],
  imports: [DatabaseModule],
})
export class EmpresaModule {}
