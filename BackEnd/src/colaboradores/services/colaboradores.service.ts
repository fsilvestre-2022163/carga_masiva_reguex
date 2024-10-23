import { Injectable } from '@nestjs/common';
import { Colaboradores } from '../interfaces/colaboradores.interface';
import { CreateColaboradoresDto } from '../interfaces/colaboradores.interface';
import { PrismaService } from 'src/database/services/prisma.service';
import { colaborador } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { removeSpaces, sanitizeAndCapitalizeAll } from 'src/utils/sanitizer';
import { catchError, firstValueFrom, map } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ColaboradoresService {
  constructor(private prisma: PrismaService, private httpService: HttpService) { }
  private readonly colaboradores: CreateColaboradoresDto[] = []


  async create(colaborador: CreateColaboradoresDto, idCompany: string, idCentro: string, idPlanilla: string, idTipoPuesto: string, jornadaLaboral: string, nombreTipoPuesto: string, departamento: string, occupationCode: string) {
    const randomPass = `${Math.floor(Math.random() * 10)}${Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")}${Math.floor(Math.random() * 10)}`;

    // -------------------------------COLABORADOR--------------------------------

    const data = await firstValueFrom(this.httpService.post(`https://recuex.com/app/api/colaborador/`,
      {
        primerNombre: sanitizeAndCapitalizeAll(colaborador.firstName),
        segundoNombre: sanitizeAndCapitalizeAll(colaborador.secondName),
        otrosNombres: sanitizeAndCapitalizeAll(colaborador.otherName),
        primerApellido: sanitizeAndCapitalizeAll(
          colaborador.firstSurname
        ),
        segundoApellido: sanitizeAndCapitalizeAll(
          colaborador.secondSurname
        ),
        apellidoCasada: null,
        nacionalidad: null,
        departamentoNacimiento: null,
        municipioNacimiento: null,
        fechaNacimiento: new Date(colaborador.birthdate)
          .toISOString()
          .slice(0, 11)
          .replace("T", " 06:00:00"),
        codigoNacimiento: null,
        genero: colaborador.gender,
        etnia: null,
        religion: null,
        estadoCivil: null,
        direccionDomicilio: null,
        departamentoDomicilio: null,
        municipioDomicilio: null,
        zonaDomicilio: null,
        codigoDomicilio: null,
        telefonoCasa: null,
        telefonoCelular: null,
        telefonoCelular2: null,
        emailPersonal: colaborador.email,
        emailEmpresa: colaborador.email,
        personasQueDependenDirectamente: null,
        personasQueDependenIndirectamente: null,
        personasQueVivenConUsted: null,
        lateralidad: null,
        tallaPlayera: null,
        tallaPantalon: null,
        tallaZapatos: null,
        dpi: colaborador.DPI,
        departamentoVecindad: null,
        municipioVecindad: null,
        codigoVecindad: null,
        numeroAfiliacionIgss: null,
        numeroAfiliacionIrtra: null,
        jubiladoIgss: false,
        seguroMedico: false,
        seguroVida: false,
        nit: null,
        pasaporte: null,
        permisoTrabajo: null,
        licenciaMoto: false,
        documentoLicenciaMoto: null,
        fechaVencimientoLicenciaMoto: null,
        licenciaVehiculo: false,
        documentoLicenciaVehiculo: null,
        claseLicenciaVehiculo: null,
        fechaVencimientoLicenciaVehiculo: null,
        fechaEmisionIrtra: null,
        estatura: null,
        peso: null,
        colorTez: null,
        contextura: null,
        colorOjos: null,
        tipoCabello: null,
        padresYconyuge: null,
        hijosYhermanos: null,
        cantidadHijos: 0,
        familiaresCompaniaYcontactosEmergencia: null,
        contrasenaUsuario: randomPass,
        perfilUsuario: '3',
        foto: null,
        empresaActiva: idCompany,
        estado: 'Activo'
      }
    ).pipe(
      map((response) => response.data),
      catchError((error: AxiosError) => {
        console.error('Error al crear colaborador:', error.message);
        throw error;
      })
    ));

    // -------------------------------OBTENER COLABORADOR--------------------------------

    const user = await firstValueFrom(
      this.httpService.get(
        `https://recuex.com/app/api/colaborador/newcolab/${sanitizeAndCapitalizeAll(colaborador.firstName)}/${sanitizeAndCapitalizeAll(colaborador.firstSurname)}/${removeSpaces(colaborador.email)}`
      ).pipe(
        map((response) => response.data),
        catchError((error: AxiosError) => {
          console.error('Error al obtener colaborador:', error.message);
          throw error;
        })
      )
    )

    // -------------------------------DETALLE COLABORADOR--------------------------------

    const body = {
      idColaborador: user.body[0].id,
      profesion: null,
      medicamento: null,
      discapacidad: null,
      alergiaPenicilina: null,
      alergias: null,
      otrasCondiciones: null,
      diabetes: null,
      vertigo: null,
      migrana: null,
      problemasCardiacos: null,
      presionAlta: null,
      dolorColumna: null,
      convulsiones: null,
      asma: null,
      desmayos: null,
      lentes: false,
      aparatoAuditivo: false,
      tipoSangre: null,
      lunaresCicatrices: null,
      transfucionSanguinea: false,
      motivoRechazoTransfucionSanguinea: null,
      enfermedadTipoLaboral: null,
      accidentesLaborales: null,
      bebidasAlcoholicas: null,
      deportesExtremos: null,
      maquinasYHerramientas: null,
      manejaVehiculo: null,
      poseeVehiculo: null,
      tipoVehiculo: null,
      modeloVehiculo: null,
      placaVehiculo: null,
      manejaMotocicleta: null,
      poseeMotocicleta: null,
      tipoMotocicleta: null,
      modeloMotocicleta: null,
      placaMotocicleta: null,
      detalleTrabajosExtranjeros: null,
      nivelAcademico: null,
      idiomas: null,
      recordEscolar: null,
      estudiosActuales: null,
    }
    const detalle = await firstValueFrom(this.httpService.post('https://recuex.com/app/api/detalleColaborador/', body))

    //---------------------------------PLAZA---------------------------------

    const bodyPlaza = {
      codigoPlaza: colaborador.plazaId,
      idColaborador: user.body[0].id,
      idPlanilla: idPlanilla,
      estatus: colaborador.jobEndDate && colaborador.jobEndDate.toISOString() === '1970-01-01T00:00:00.000Z'
        ? "Activa" : "Inactiva",
      formaPago: colaborador.methodOfPayment,
      banco: colaborador.bank,
      tipoCuenta: colaborador.typeAccount,
      numeroCuentaBanco: colaborador.accountNumber,
      fechaIngreso: new Date(colaborador.jobStartDate)
        .toISOString()
        .slice(0, 11)
        .replace("T", " 00:00:00"),
      fechaBaja: colaborador.jobEndDate && colaborador.jobEndDate.toISOString() === '1970-01-01T00:00:00.000Z'
        ? null
        : new Date(colaborador.jobEndDate)
          .toISOString()
          .slice(0, 11)
          .replace("T", " 00:00:00"),
      tipoBaja: null,
      motivoBaja: null,
      diasVacacionesGozados: 0,
      centro: idCentro,
      fechaFirmaContrato: null,
      tipoContrato: colaborador.typeContract,
      ciudadFirmaContrato: null,
      inicioContrato: new Date(colaborador.jobStartDate)
        .toISOString()
        .slice(0, 11)
        .replace("T", " 00:00:00"),
      finContrato:
        colaborador.typeContract === "Indefinido" && colaborador.jobEndDate.toISOString() === '1970-01-01T00:00:00.000Z'
          ? null
          : (colaborador.typeContract === "Definido"
            ? colaborador.dateEndContract
              .toISOString()
              .slice(0, 11)
              .replace("T", " 00:00:00")
            : new Date(colaborador.jobEndDate)
              .toISOString()
              .slice(0, 11)
              .replace("T", " 00:00:00")),

      plazaTemporal:
        colaborador.typeContract === "Definido",
      fechaFiniquito: null,
      pagarSeptimoContratacion: null,
      //jornadaLaboral: JSON.stringify(journey),
      //resumenJornada: JSON.stringify(resumenData),
      estado: colaborador.jobEndDate && colaborador.jobEndDate.toISOString() === '1970-01-01T00:00:00.000Z'
        ? true : false,
      dpi: colaborador.DPI
    }
    const plaza = await firstValueFrom(this.httpService.post('https://recuex.com/app/api/plaza/', bodyPlaza))

    // -------------------------------OBTENER PLAZA--------------------------------

    const getPlaza = await firstValueFrom(this.httpService.get(`https://recuex.com/app/api/plaza/newplaza/${colaborador.plazaId}/${user.body[0].id}`
    ).pipe(
      map((response) => response.data),
      catchError((error: AxiosError) => {
        console.error('Error al obtener historial:', error.message);
        throw error;
      })
    ))

    // -------------------------------HISTORIAL SALARIO--------------------------------

    const bodyHistorialSalario = {
      idPlaza: getPlaza.body[0].id,
      fechaInicioSalario: colaborador.jobStartDate
        .toISOString()
        .slice(0, 11)
        .replace("T", " 00:00:00"),
      fechaFinalSalario: colaborador.jobEndDate && colaborador.jobEndDate.toISOString() === '1970-01-01T00:00:00.000Z'
        ? null : colaborador.jobEndDate.toISOString()
          .slice(0, 11)
          .replace("T", " 00:00:00"),
      salarioBase: colaborador.currentBaseSalary,
      bonifNoAfectaPasivos: colaborador.bonus,
      bonifAfectaPasivos: 0.00,
    }
    const historialSalario = await firstValueFrom(this.httpService.post('https://recuex.com/app/api/historialSalarios/', bodyHistorialSalario))

    // -------------------------------PUESTO--------------------------------
    const bodyPuesto = {
      idEmpresa: idCompany,
      nombrePuesto: colaborador.jobPosition,
      correlativo: 1,
      ocupante: getPlaza.body[0].id,
      padre: null,
      idTipoPuesto: idTipoPuesto,
      jornadaLaboral: jornadaLaboral,
      resumenJornada: jornadaLaboral,
      jornadaTextual: jornadaLaboral,
      resumenJornadaTextual: jornadaLaboral,
    }

    const puesto = await firstValueFrom(this.httpService.post("https://recuex.com/app/api/puesto/", bodyPuesto)
      .pipe(map((response) => response.data),
        catchError((error: AxiosError) => {
          console.error('Error al obtener colaborador:', error.message);
          throw error;
        })
      ))

    // -------------------------------TIPO PUESTO--------------------------------
    // const bodyTipoPuesto = {
    //   idEmpresa: idCompany,
    //   nombreTipo: nombreTipoPuesto,
    //   objetivo: "",
    //   funcionesPrincipales: [""],
    //   competencias: "",
    //   educacion: "",
    //   experienciaLaboral: "",
    //   habilidadesEspecificas: "",
    //   factoresAmbientalesyFisicos: "",
    //   informacionEspecifica: "",
    //   departamento: departamento,
    //   codigoOcupacion: occupationCode,
    //   jornadaLaboral: `{"horariosJornadasGlobales":{"jornadaDiurna":true,"jornadaNocturna":false,
    //     "jornadaMixta":false,"jornadaContinuaDiurna":false,"personalizada":true,"openJornada":false},
    //     "contrato":{"horasDiarias":"","horasSemanales":""},"jornadaDiurna":{"primeraHoraInicioDiurna":"",
    //     "primeraHoraFinDiurna":"","horaInicioDescansoDiurna":"","horaFinDescansoDiurna":"",
    //     "segundaHoraInicioDiurna":"","segundaHoraFinDiurna":"","diaInicioDiurna":"",
    //     "diaFinDiurna":"","clausulaDiurna":"","openClausulaDiurna":false},"jornadaNocturna":
    //     {"primeraHoraInicioNocturna":"","primeraHoraFinNocturna":"","horaInicioDescansoNocturna":"",
    //     "horaFinDescansoNocturna":"","segundaHoraInicioNocturna":"","segundaHoraFinNocturna":"",
    //     "diaInicioNocturna":"","diaFinNocturna":"","clausulaNocturna":"","openClausulaNocturna":false},
    //     "jornadaMixta":{"primeraHoraInicioMixta":"","primeraHoraFinMixta":"","horaInicioDescansoMixta":"",
    //     "horaFinDescansoMixta":"","segundaHoraInicioMixta":"","segundaHoraFinMixta":"","diaInicioMixta":"",
    //     "diaFinMixta":"","clausulaMixta":"","openClausulaMixta":false},
    //     "jornadaContinuaDiurna":{"primeraHoraInicioContinuaDiurna":"",
    //     "primeraHoraFinContinuaDiurna":"","horaInicioDescansoContinuaDiurna":"",
    //     "horaFinDescansoContinuaDiurna":"","diaInicioContinuaDiurna":"","diaFinContinuaDiurna":"",
    //     "clausulaContinuaDiurna":"","openClausulaContinuaDiurna":false},
    //     "descansos":{"numeroDescansos":""},"personalizada":{
    //     "messageBody":"${jornadaLaboral}"}}`,
    //   resumenJornada: jornadaLaboral,
    //   tipoPuestoJefe: null,
    //   tiempoParcial: false,
    //   constactOptionalDefaultClauses: [""],
    //   constractCustomClauses: [""],
    // }
    // console.log(bodyTipoPuesto)
    //const tipoPuesto = await firstValueFrom(this.httpService.post("https://recuex.com/app/api/tipopuesto/", bodyTipoPuesto))

  }
}
