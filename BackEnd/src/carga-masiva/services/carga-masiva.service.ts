import { format } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/services/prisma.service';
import { DatosCargaMasivaDto } from '../dto/carga-masiva.dto';
import { Centro, Planilla, Colaborador, Tipo_Puesto, Puesto } from '@prisma/client';
import { ColaboradoresService } from 'src/colaboradores/services/colaboradores.service';

/*

ACÁ ES DONDE SE GUARDAN TODOS LOS DATOS DE LAS TABLAS --CARGA MASIVA--

*/

@Injectable()
export class CargaMasivaService {
  constructor(private prisma: PrismaService, private collaboratorService: ColaboradoresService) { }

  async create(datosCargaMasivaDto: DatosCargaMasivaDto) {

    const { centroDeTrabajo, planillas, colaboradores, tipoPuestos } = datosCargaMasivaDto;
    let dbCentros;
    let dbPlanillas;
    let dbTipoPuestos;

    // -------------------------------CENTROS DE TRABAJO--------------------------------
    if (centroDeTrabajo && centroDeTrabajo.length > 0) {
      const mappedCentroData = centroDeTrabajo.map((centro, index) => ({
        nombreCentro: centro.nameWorkCenter,
        departamentoCentro: centro.idDepartament,
        municipioCentro: centro.idMunicipalty,
        zona: Number(centro.zone),
        direccionCentro: centro.address,
        nombreContactoCentro: centro.workCenterContact,
        telefonosCentro: centro.contactPhone,
        correlativo: index + 1,
        idEmpresa: datosCargaMasivaDto.idCompany,
        correoCentro: centro.emailContact,
      }));

      dbCentros = await Promise.all(
        mappedCentroData.map(async (centro) => {
          return this.prisma.centro.create({
            data: centro,
          });
        })
      );
    }

    // -------------------------------PLANILLAS--------------------------------
    if (planillas && planillas.length > 0) {
      const mappedPlanillaData = planillas.map((planilla) => {

        const paymentFrequencyNumber = parseInt(planilla.paymentFrequency.split(' ')[0], 10);

        const convertToBoolean = (value: any): boolean => {
          if (typeof value === 'boolean') return value;
          if (typeof value === 'string') return value.toLowerCase() === 'true';
          return !!value;
        };

        return {
          nombrePlanilla: planilla.name,
          idEmpresa: datosCargaMasivaDto.idCompany,
          frecuenciaPago: paymentFrequencyNumber,
          quincenaDeDieciseis: false,
          estado: 'Activa',
          turnosRotativos: convertToBoolean(planilla.rotatingShifts),
          sabadoSeptimo: convertToBoolean(planilla.workSaturday),
        };
      });

      dbPlanillas = await Promise.all(
        mappedPlanillaData.map(async (planilla) => {
          return this.prisma.planilla.create({
            data: planilla,
          });
        })
      );
    }

    // -------------------------------TIPO PUESTOS--------------------------------
    if (tipoPuestos && tipoPuestos.length > 0) {
      console.log(tipoPuestos);
      const mappedPuestoData = tipoPuestos.map((puesto) => ({
        idEmpresa: datosCargaMasivaDto.idCompany,
        nombreTipo: puesto.name,
        objetivo: "",
        funcionesPrincipales: `[""]`,
        competencias: null,
        educacion: null,
        experienciaLaboral: null,
        habilidadeEspecificas: null,
        factoresAmbientalesyFisicos: null,
        informacionEspecifica: null,
        departamento: puesto.areaOrDepartament,
        codigoOcupacion: puesto.occupationCode,
        jornadaLaboral: `{"horariosJornadasGlobales":{"jornadaDiurna":true,"jornadaNocturna":false,
        "jornadaMixta":false,"jornadaContinuaDiurna":false,"personalizada":true,"openJornada":false},
        "contrato":{"horasDiarias":"","horasSemanales":""},"jornadaDiurna":{"primeraHoraInicioDiurna":"",
        "primeraHoraFinDiurna":"","horaInicioDescansoDiurna":"","horaFinDescansoDiurna":"",
        "segundaHoraInicioDiurna":"","segundaHoraFinDiurna":"","diaInicioDiurna":"",
        "diaFinDiurna":"","clausulaDiurna":"","openClausulaDiurna":false},"jornadaNocturna":
        {"primeraHoraInicioNocturna":"","primeraHoraFinNocturna":"","horaInicioDescansoNocturna":"",
        "horaFinDescansoNocturna":"","segundaHoraInicioNocturna":"","segundaHoraFinNocturna":"",
        "diaInicioNocturna":"","diaFinNocturna":"","clausulaNocturna":"","openClausulaNocturna":false},
        "jornadaMixta":{"primeraHoraInicioMixta":"","primeraHoraFinMixta":"","horaInicioDescansoMixta":"",
        "horaFinDescansoMixta":"","segundaHoraInicioMixta":"","segundaHoraFinMixta":"","diaInicioMixta":"",
        "diaFinMixta":"","clausulaMixta":"","openClausulaMixta":false},
        "jornadaContinuaDiurna":{"primeraHoraInicioContinuaDiurna":"",
        "primeraHoraFinContinuaDiurna":"","horaInicioDescansoContinuaDiurna":"",
        "horaFinDescansoContinuaDiurna":"","diaInicioContinuaDiurna":"","diaFinContinuaDiurna":"",
        "clausulaContinuaDiurna":"","openClausulaContinuaDiurna":false},
        "descansos":{"numeroDescansos":""},"personalizada":{
        "messageBody":"${puesto.workday}"}}`,
        resumenJornada: puesto.workday,
        tipoPuestoJefe: null,
        contractOptionalDefaultClauses: `[]`,
        contractCustomClauses: `[]`,
        tiempoParcial: 0,
        codigoOcupacionMintrab: puesto.occupationCode,
      }
      ));

      dbTipoPuestos = await Promise.all(
        mappedPuestoData.map(async (puesto) => {
          return this.prisma.tipo_Puesto.create({
            data: puesto,
          });
        })
      );
    }

    // -------------------------------COLABORADORES--------------------------------
    if (colaboradores && colaboradores.length > 0) {
      colaboradores.map(async (colaborador) => {
        const collaboratorCenter = dbCentros.find((centro) => centro.nombreCentro === colaborador.workCenter);
        const collaboratorPlanilla = dbPlanillas.find((planilla) => planilla.nombrePlanilla === colaborador.planilla);
        const collaboratorJobPosition = dbTipoPuestos.find((tipoPuesto) => tipoPuesto.nombreTipo === colaborador.jobPosition);
        const jornadaLaboral = collaboratorJobPosition ? collaboratorJobPosition.jornadaLaboral : null;
        const nombreTipoPuesto = collaboratorJobPosition ? collaboratorJobPosition.nombreTipo : null;
        const departamento = collaboratorJobPosition ? collaboratorJobPosition.departamento : null;
        const occupationCode = collaboratorJobPosition ? collaboratorJobPosition.codigoOcupacion : null;

        return await this.collaboratorService.create({
          plazaId: colaborador.plazaId,
          firstName: colaborador.firstName,
          secondName: colaborador.secondName,
          otherName: colaborador.otherName,
          firstSurname: colaborador.firstSurname,
          secondSurname: colaborador.secondSurname,
          birthdate: new Date(colaborador.birthdate),
          DPI: colaborador.DPI,
          gender: colaborador.gender,
          email: colaborador.email,
          planilla: collaboratorPlanilla.id,
          workCenter: collaboratorCenter.id,
          jobPosition: collaboratorJobPosition.id,
          currentBaseSalary: colaborador.currentBaseSalary,
          bonus: colaborador.bonus,
          methodOfPayment: colaborador.methodOfPayment,
          bank: colaborador.bank,
          typeAccount: colaborador.typeAccount,
          accountNumber: colaborador.accountNumber,
          typeContract: colaborador.typeContract,
          dateEndContract: new Date(colaborador.dateEndContract),
          jobStartDate: new Date(colaborador.jobStartDate),
          jobEndDate: new Date(colaborador.jobEndDate),
        }, datosCargaMasivaDto.idCompany, collaboratorCenter.id, collaboratorPlanilla.id, collaboratorJobPosition.id, jornadaLaboral, nombreTipoPuesto, departamento, occupationCode);
      });

    }
  }

  //---------------------------------OBTENER TODOS LOS DATOS--------------------------------
  async findAll(): Promise<{
    centros: Centro[];
    planillas: Planilla[];
    colaboradores: Colaborador[];
    tipoPuestos: Tipo_Puesto[];
  }> {
    const [centros, planillas, colaboradores, tipoPuestos] = await Promise.all([
      this.prisma.centro.findMany(),
      this.prisma.planilla.findMany(),
      this.prisma.colaborador.findMany(),
      this.prisma.tipo_Puesto.findMany(),
    ]);

    return {
      centros,
      planillas,
      colaboradores,
      tipoPuestos,
    };
  }
}