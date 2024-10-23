import { Module } from '@nestjs/common';
import { CentroDeTrabajoController } from './controllers/centro-de-trabajo.controller';
import { CentroDeTrabajoService } from './services/centro-de-trabajo.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [CentroDeTrabajoController],
  providers: [CentroDeTrabajoService],
  imports: [DatabaseModule]
})
export class CentroDeTrabajoModule {}
