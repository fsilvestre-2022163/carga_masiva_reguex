import { Module } from '@nestjs/common';
import { PlanillasController } from './controllers/planillas.controller';
import { PlanillasService } from './services/planillas.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PlanillasController],
  providers: [PlanillasService],
  imports: [DatabaseModule]
})
export class PlanillaModule {}
