import { Module } from '@nestjs/common';
import { PuestosController } from './controllers/puestos.controller';
import { PuestosService } from './services/puestos.service';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  controllers: [PuestosController],
  providers: [PuestosService],
  imports: [DatabaseModule]
})
export class PuestosModule {}
