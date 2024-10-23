import { Module } from '@nestjs/common';
import { ColaboradoresService } from './services/colaboradores.service';
import { ColaboradoresController } from './controllers/colaboradores.controller';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ColaboradoresService],
  controllers: [ColaboradoresController],
  imports: [DatabaseModule, HttpModule],
  exports: [ColaboradoresService],
})
export class ColaboradoresModule {}
