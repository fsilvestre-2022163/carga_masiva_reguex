drop database if exists Prueba;
create database Prueba;
use Prueba;

create table AnticiposPendientes
(
    id         int auto_increment
        primary key,
    idAnticipo int            null,
    Saldo      decimal(10, 2) null,
    cuota      decimal(10, 2) null,
    estado     tinyint(1)     null
);

create table Banco
(
    id     int auto_increment
        primary key,
    nombre varchar(255) null
);

create table Departamento
(
    id                 int auto_increment
        primary key,
    nombreDepartamento varchar(255) null,
    igssId             varchar(2)   null
);

create table Municipio
(
    id               int auto_increment
        primary key,
    idDepartamento   int          null,
    nombreMunicipio  varchar(255) null,
    codigoMunicipio  varchar(255) null,
    igssId           varchar(2)   null,
    empleador_codigo varchar(10)  null,
    constraint Municipio_ibfk_1
        foreign key (idDepartamento) references Departamento (id)
);

create index idDepartamento
    on Municipio (idDepartamento);

create table Orden_Carga
(
    id        varchar(70) not null
        primary key,
    idEmpresa varchar(70) null,
    tipo      varchar(70) null,
    data      mediumtext  null
);

create table Pais
(
    id               int auto_increment
        primary key,
    nombrePais       varchar(255) null,
    codigo           varchar(20)  null,
    empleador_codigo varchar(5)   null,
    nacionalidad     varchar(100) null
);

create table Empresa
(
    id                                 varchar(70)  not null
        primary key,
    razonSocial                        varchar(255) null,
    nit                                varchar(255) null,
    logo                               longtext     null,
    departamento                       int          null,
    municipio                          int          null,
    direccion                          varchar(255) null,
    telefono                           varchar(255) null,
    email                              varchar(255) null,
    paginaWeb                          varchar(255) null,
    actividadEconomica                 longtext     null,
    represLegal                        varchar(255) null,
    dpiRepresLegal                     varchar(255) null,
    numPatronalIgss                    varchar(255) null,
    anioInicio                         datetime     null,
    miercolesSanto                     tinyint(1)   null,
    outsourcing                        tinyint(1)   null,
    estado                             tinyint(1)   null,
    nombreComercialEmpresa             varchar(100) null,
    fechaNacimientoRepresentante       datetime     null,
    generoRepresentante                varchar(50)  null,
    estadoCivilRepresentante           varchar(100) null,
    nacionalidadRepresentante          int          null,
    departamentoActaNombramiento       int          null,
    municipioActaNombramiento          int          null,
    fechaAcreditacion                  datetime     null,
    nombreNotario                      varchar(900) null,
    registroMercantil                  varchar(10)  null,
    folioMercantil                     varchar(10)  null,
    libroMercantil                     varchar(10)  null,
    departamentoDomicilioRepresentante int          null,
    fechaInicioCobro                   datetime     null,
    constraint Empresa_ibfk_1
        foreign key (departamento) references Departamento (id),
    constraint Empresa_ibfk_2
        foreign key (municipio) references Municipio (id),
    constraint Empresa_ibfk_3
        foreign key (nacionalidadRepresentante) references Pais (id),
    constraint Empresa_ibfk_4
        foreign key (departamentoActaNombramiento) references Departamento (id),
    constraint Empresa_ibfk_5
        foreign key (municipioActaNombramiento) references Municipio (id),
    constraint Empresa_ibfk_6
        foreign key (departamentoDomicilioRepresentante) references Departamento (id)
);

create table Area_Departamento
(
    id                 varchar(70)  not null
        primary key,
    nombreDepartamento varchar(100) null,
    idEmpresa          varchar(70)  null,
    constraint Area_Departamento_ibfk_1
        foreign key (idEmpresa) references Empresa (id)
);

create index idEmpresa
    on Area_Departamento (idEmpresa);

create table Centro
(
    id                       int auto_increment
        primary key,
    nombreCentro             varchar(100) null,
    direccionCentro          varchar(100) null,
    zona                     int          null,
    telefonosCentro          varchar(40)  null,
    faxCentro                varchar(40)  null,
    nombreContactoCentro     varchar(50)  null,
    correoCentro             varchar(50)  null,
    departamentoCentro       int          null,
    municipioCentro          int          null,
    codigoActividadEconomica varchar(45)  null,
    idEmpresa                varchar(70)  null,
    correlativo              int          null,
    constraint Centro_ibfk_1
        foreign key (departamentoCentro) references Departamento (id),
    constraint Centro_ibfk_2
        foreign key (municipioCentro) references Municipio (id),
    constraint Centro_ibfk_3
        foreign key (idEmpresa) references Empresa (id)
);

create index departamentoCentro
    on Centro (departamentoCentro);

create index idEmpresa
    on Centro (idEmpresa);

create index municipioCentro
    on Centro (municipioCentro);

create index departamento
    on Empresa (departamento);

create index departamentoActaNombramiento
    on Empresa (departamentoActaNombramiento);

create index departamentoDomicilioRepresentante
    on Empresa (departamentoDomicilioRepresentante);

create index municipio
    on Empresa (municipio);

create index municipioActaNombramiento
    on Empresa (municipioActaNombramiento);

create index nacionalidadRepresentante
    on Empresa (nacionalidadRepresentante);

create table Factura
(
    id        int auto_increment
        primary key,
    periodo   date        not null,
    estado    varchar(20) not null,
    factura   longtext    not null,
    idEmpresa varchar(50) not null,
    monto     varchar(10) null,
    constraint Factura_ibfk_1
        foreign key (idEmpresa) references Empresa (id)
);

create index idEmpresa
    on Factura (idEmpresa);

create table Perfiles
(
    id           int auto_increment
        primary key,
    nombrePerfil varchar(255) null,
    permisos     longtext     null
);

create table Colaborador
(
    id                                     varchar(70)  not null
        primary key,
    primerNombre                           varchar(255) null,
    segundoNombre                          varchar(255) null,
    otrosNombres                           varchar(255) null,
    primerApellido                         varchar(255) null,
    segundoApellido                        varchar(255) null,
    apellidoCasada                         varchar(255) null,
    nacionalidad                           int          null,
    departamentoNacimiento                 int          null,
    municipioNacimiento                    int          null,
    fechaNacimiento                        datetime     null,
    codigoNacimiento                       varchar(255) null,
    genero                                 varchar(255) null,
    etnia                                  varchar(255) null,
    religion                               varchar(255) null,
    estadoCivil                            varchar(255) null,
    direccionDomicilio                     mediumtext   null,
    departamentoDomicilio                  int          null,
    municipioDomicilio                     int          null,
    zonaDomicilio                          varchar(255) null,
    codigoDomicilio                        varchar(255) null,
    telefonoCasa                           varchar(255) null,
    telefonoCelular                        varchar(255) null,
    telefonoCelular2                       varchar(255) null,
    emailPersonal                          varchar(255) null,
    emailEmpresa                           varchar(255) null,
    personasQueDependenDirectamente        int          null,
    personasQueDependenIndirectamente      int          null,
    personasQueVivenConUsted               int          null,
    lateralidad                            varchar(255) null,
    tallaPlayera                           varchar(255) null,
    tallaPantalon                          varchar(255) null,
    tallaZapatos                           varchar(255) null,
    dpi                                    varchar(255) null,
    departamentoVecindad                   int          null,
    municipioVecindad                      int          null,
    codigoVecindad                         varchar(255) null,
    numeroAfiliacionIgss                   varchar(100) null,
    numeroAfiliacionIrtra                  varchar(100) null,
    jubiladoIgss                           tinyint(1)   null,
    seguroMedico                           tinyint(1)   null,
    seguroVida                             tinyint(1)   null,
    nit                                    varchar(255) null,
    pasaporte                              varchar(255) null,
    permisoTrabajo                         varchar(255) null,
    licenciaMoto                           tinyint(1)   null,
    documentoLicenciaMoto                  varchar(255) null,
    fechaVencimientoLicenciaMoto           datetime     null,
    licenciaVehiculo                       tinyint(1)   null,
    documentoLicenciaVehiculo              varchar(255) null,
    claseLicenciaVehiculo                  varchar(255) null,
    fechaVencimientoLicenciaVehiculo       datetime     null,
    fechaEmisionIrtra                      datetime     null,
    estatura                               varchar(255) null,
    peso                                   varchar(255) null,
    colorTez                               varchar(255) null,
    contextura                             varchar(255) null,
    colorOjos                              varchar(255) null,
    tipoCabello                            varchar(255) null,
    padresYconyuge                         text         null,
    hijosYhermanos                         mediumtext   null,
    cantidadHijos                          int          null,
    familiaresCompaniaYcontactosEmergencia mediumtext   null,
    contrasenaUsuario                      varchar(255) null,
    perfilUsuario                          int          null,
    foto                                   longtext     null,
    empresaActiva                          varchar(70)  null,
    estado                                 varchar(70)  null,
    fechaInicioRecuex                      datetime     null,
    constraint Colaborador_ibfk_1
        foreign key (nacionalidad) references Pais (id),
    constraint Colaborador_ibfk_2
        foreign key (departamentoVecindad) references Departamento (id),
    constraint Colaborador_ibfk_3
        foreign key (departamentoNacimiento) references Departamento (id),
    constraint Colaborador_ibfk_4
        foreign key (departamentoDomicilio) references Departamento (id),
    constraint Colaborador_ibfk_5
        foreign key (municipioNacimiento) references Municipio (id),
    constraint Colaborador_ibfk_6
        foreign key (municipioDomicilio) references Municipio (id),
    constraint Colaborador_ibfk_7
        foreign key (municipioVecindad) references Municipio (id),
    constraint Colaborador_ibfk_8
        foreign key (empresaActiva) references Empresa (id),
    constraint Colaborador_ibfk_9
        foreign key (perfilUsuario) references Perfiles (id)
);

create table Acceso_Planillas
(
    id            int auto_increment
        primary key,
    idEmpresa     varchar(70) null,
    idColaborador varchar(70) null,
    accesos       mediumtext  null,
    constraint Acceso_Planillas_ibfk_1
        foreign key (idEmpresa) references Empresa (id),
    constraint Acceso_Planillas_ibfk_2
        foreign key (idColaborador) references Colaborador (id)
);

create index idColaborador
    on Acceso_Planillas (idColaborador);

create index idEmpresa
    on Acceso_Planillas (idEmpresa);

create index departamentoDomicilio
    on Colaborador (departamentoDomicilio);

create index departamentoNacimiento
    on Colaborador (departamentoNacimiento);

create index departamentoVecindad
    on Colaborador (departamentoVecindad);

create index empresaActiva
    on Colaborador (empresaActiva);

create index municipioDomicilio
    on Colaborador (municipioDomicilio);

create index municipioNacimiento
    on Colaborador (municipioNacimiento);

create index municipioVecindad
    on Colaborador (municipioVecindad);

create index nacionalidad
    on Colaborador (nacionalidad);

create index perfilUsuario
    on Colaborador (perfilUsuario);

create table Detalle_Colaborador
(
    id                                int auto_increment
        primary key,
    idColaborador                     varchar(70)  null,
    medicamento                       text         null,
    discapacidad                      varchar(255) null,
    alergiaPenicilina                 tinyint(1)   null,
    alergias                          varchar(255) null,
    otrasCondiciones                  varchar(255) null,
    diabetes                          tinyint(1)   null,
    vertigo                           tinyint(1)   null,
    migrana                           tinyint(1)   null,
    problemasCardiacos                tinyint(1)   null,
    presionAlta                       tinyint(1)   null,
    dolorColumna                      tinyint(1)   null,
    convulsiones                      tinyint(1)   null,
    asma                              tinyint(1)   null,
    desmayos                          tinyint(1)   null,
    lentes                            tinyint(1)   null,
    aparatoAuditivo                   tinyint(1)   null,
    tipoSangre                        varchar(5)   null,
    lunaresCicatrices                 text         null,
    transfucionSanguinea              tinyint(1)   null,
    motivoRechazoTransfucionSanguinea mediumtext   null,
    enfermedadTipoLaboral             varchar(255) null,
    accidentesLaborales               varchar(255) null,
    bebidasAlcoholicas                varchar(20)  null,
    deportesExtremos                  text         null,
    maquinasYHerramientas             text         null,
    manejaVehiculo                    tinyint(1)   null,
    poseeVehiculo                     tinyint(1)   null,
    tipoVehiculo                      varchar(100) null,
    modeloVehiculo                    varchar(100) null,
    placaVehiculo                     varchar(100) null,
    manejaMotocicleta                 tinyint(1)   null,
    poseeMotocicleta                  tinyint(1)   null,
    tipoMotocicleta                   varchar(100) null,
    modeloMotocicleta                 varchar(100) null,
    placaMotocicleta                  varchar(100) null,
    detalleTrabajosExtranjeros        mediumtext   null,
    profesion                         varchar(100) null,
    nivelAcademico                    varchar(100) null,
    idiomas                           text         null,
    recordEscolar                     text         null,
    estudiosActuales                  text         null,
    comunidadLinguistica              varchar(20)  null,
    constraint Detalle_Colaborador_ibfk_1
        foreign key (idColaborador) references Colaborador (id)
);

create index idColaborador
    on Detalle_Colaborador (idColaborador);

create table Planilla
(
    id                       int auto_increment
        primary key,
    idEmpresa                varchar(70)  null,
    nombrePlanilla           varchar(255) null,
    frecuenciaPago           int          null,
    sabadoSeptimo            tinyint(1)   null,
    quincenaDeDieciseis      tinyint(1)   null,
    banco                    int          null,
    numeroCuentaBanco        varchar(20)  null,
    estado                   varchar(70)  null,
    codigoActividadEconomica varchar(45)  null,
    turnosRotativos          tinyint(1)   null,
    constraint Planilla_ibfk_1
        foreign key (idEmpresa) references Empresa (id),
    constraint Planilla_ibfk_2
        foreign key (banco) references Banco (id)
);

create table HistorialPagos
(
    id                       int auto_increment
        primary key,
    idPPP                    int            null,
    idPlaza                  int            null,
    idPlanilla               int            null,
    apellidos                varchar(255)   null,
    nombre                   varchar(255)   null,
    cuentaMonetaria          varchar(255)   null,
    diasLaborados            decimal(10, 2) null,
    numeroHorasExtras        decimal(10, 2) null,
    numeroHorasExtrasSimples decimal(10, 2) null,
    numeroHorasExrtrasDobles decimal(10, 2) null,
    SalarioDevengado         decimal(10, 2) null,
    bonifNoAfectaPasivos     decimal(10, 2) null,
    horasExtrasSimples       decimal(10, 2) null,
    HorasExrtrasDobles       decimal(10, 2) null,
    comisiones               decimal(10, 2) null,
    anticipos_Reintegros     decimal(10, 2) null,
    totalDevengado           decimal(10, 2) null,
    totalDeducciones         decimal(10, 2) null,
    liquidoRecibir           decimal(10, 2) null,
    igss                     decimal(10, 2) null,
    isr                      decimal(10, 2) null,
    almuerzo                 decimal(10, 2) null,
    medicina                 decimal(10, 2) null,
    descuentoJudicial        decimal(10, 2) null,
    bantrab                  decimal(10, 2) null,
    BI                       decimal(10, 2) null,
    anticipo                 decimal(10, 2) null,
    boletoOrnato             decimal(10, 2) null,
    otros                    decimal(10, 2) null,
    isrAjuste                decimal(10, 2) null,
    estado                   tinyint(1)     null,
    constraint HistorialPagos_ibfk_1
        foreign key (idPlanilla) references Planilla (id)
);

create index idPlanilla
    on HistorialPagos (idPlanilla);

create index banco
    on Planilla (banco);

create index idEmpresa
    on Planilla (idEmpresa);

create table Plaza
(
    id                       int auto_increment
        primary key,
    codigoPlaza              varchar(70)   null,
    idColaborador            varchar(70)   null,
    idPlanilla               int           null,
    estatus                  varchar(255)  null,
    formaPago                varchar(255)  null,
    banco                    int           null,
    numeroCuentaBanco        varchar(255)  null,
    fechaIngreso             datetime      null,
    fechaBaja                datetime      null,
    tipoBaja                 varchar(255)  null,
    motivoBaja               longtext      null,
    diasVacacionesGozados    float(100, 1) null,
    tipoContrato             varchar(255)  null,
    plazaTemporal            tinyint(1)    null,
    fechaFiniquito           datetime      null,
    pagarSeptimoContratacion tinyint(1)    null,
    estado                   tinyint(1)    null,
    centro                   int           null,
    fechaFirmaContrato       datetime      null,
    inicioContrato           datetime      null,
    finContrato              datetime      null,
    ciudadFirmaContrato      varchar(255)  null,
    tipoCuenta               varchar(15)   null,
    constraint Plaza_ibfk_1
        foreign key (idColaborador) references Colaborador (id),
    constraint Plaza_ibfk_2
        foreign key (banco) references Banco (id),
    constraint Plaza_ibfk_3
        foreign key (idPlanilla) references Planilla (id),
    constraint Plaza_ibfk_7
        foreign key (centro) references Centro (id)
);

create table Anticipos
(
    id                 int auto_increment
        primary key,
    idPlaza            int            null,
    idPlanilla         int            null,
    anticipo           decimal(10, 2) null,
    interes            decimal(10, 2) null,
    inicioPeriodoCobro datetime       null,
    saldo              decimal(10, 2) null,
    estado             tinyint(1)     null,
    constraint Anticipos_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Anticipos (idPlaza);

create table DescuentoBancario
(
    id             int auto_increment
        primary key,
    idPlaza        int            null,
    montoDescuento decimal(10, 2) null,
    anotacion      longtext       null,
    constraint DescuentoBancario_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on DescuentoBancario (idPlaza);

create table Faltas
(
    id                       int auto_increment
        primary key,
    idPlaza                  int        null,
    diasHabiles              int        null,
    diasSeptimos             int        null,
    fechaInicio              datetime   null,
    fechaFin                 datetime   null,
    fechaInicioPeriodo       datetime   null,
    fechaFinPeriodo          datetime   null,
    noDescontarUltimoSeptimo tinyint(1) null,
    constraint Faltas_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Faltas (idPlaza);

create table Historial_Salarios
(
    id                   int auto_increment
        primary key,
    idPlaza              int            null,
    fechaInicioSalario   datetime       null,
    fechaFinalSalario    datetime       null,
    salarioBase          decimal(10, 2) null,
    bonifNoAfectaPasivos decimal(10, 2) null,
    bonifAfectaPasivos   decimal(10, 2) null,
    constraint Historial_Salarios_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Historial_Salarios (idPlaza);

create table Licencias
(
    id                 int auto_increment
        primary key,
    idPlaza            int          null,
    motivoLicencia     varchar(255) null,
    personaQueAutoriza varchar(255) null,
    fechaInicio        datetime     null,
    fechaFin           datetime     null,
    fechaInicioPeriodo datetime     null,
    fechaFinPeriodo    datetime     null,
    constraint Licencias_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Licencias (idPlaza);

create table Licencias_Denimville
(
    id          int auto_increment
        primary key,
    plaza       int          null,
    tipo        longtext     null,
    fechaInicio datetime     null,
    fechaFin    datetime     null,
    autoriza    varchar(255) null,
    ingreso     datetime     null,
    constraint Licencias_Denimville_ibfk_1
        foreign key (plaza) references Plaza (id),
    constraint Licencias_Denimville_ibfk_2
        foreign key (autoriza) references Colaborador (id)
);

create index autoriza
    on Licencias_Denimville (autoriza);

create index plaza
    on Licencias_Denimville (plaza);

create table Liquidacion
(
    id                                    int auto_increment
        primary key,
    idPlaza                               int                         null,
    codigoPlaza                           varchar(255)                null,
    nombreCompleto                        varchar(255)                null,
    puesto                                int                         null,
    empresa                               varchar(255)                null,
    motivoBaja                            varchar(255)                null,
    fechaBaja                             datetime                    null,
    doceSalarios                          longtext                    null,
    fechaInicioIndemnizacion              datetime                    null,
    fechaFinIndemnizacion                 datetime                    null,
    salarioBasePromedioIndemnizacion      decimal(10, 2)              null,
    salarioBaseAnualizadoIndemnizacion    decimal(10, 2)              null,
    salarioExtraPromedioIndemnizacion     decimal(10, 2)              null,
    totalSalarioPromedioIndemnizacion     decimal(10, 2)              null,
    diasIndemnizacion                     int                         null,
    totalIndemnizacion                    decimal(10, 2)              null,
    fechaInicioAguinaldo                  datetime                    null,
    fechaFinAguinaldo                     datetime                    null,
    salarioBasePromedioAguinaldo          decimal(10, 2)              null,
    diasAguinaldo                         int                         null,
    totalAguinaldo                        decimal(10, 2)              null,
    fechaInicioBono                       datetime                    null,
    fechaFinBono                          datetime                    null,
    salarioBasePromedioBono               decimal(10, 2)              null,
    diasBono                              int                         null,
    totalBono                             decimal(10, 2)              null,
    fechaInicioVacaciones                 datetime                    null,
    fechaFinVacaciones                    datetime                    null,
    salarioBasePromedioVacaciones         decimal(10, 2)              null,
    salarioExtraPromedioVacaciones        decimal(10, 2)              null,
    totalSalarioPromedioVacaciones        decimal(10, 2)              null,
    diasLaborados                         int                         null,
    diasCorrespondientes                  decimal(10, 1)              null,
    diasGozados                           decimal(10, 1)              null,
    diasPendientesPago                    decimal(10, 1)              null,
    totalVacaciones                       decimal(10, 2)              null,
    totalPagoLiquidacion                  decimal(10, 2)              null,
    idEmpresa                             varchar(70)                 null,
    bonifAfectaPromedioIndemnizacion      decimal(10, 2) default 0.00 not null,
    bonifAfectaPromedioAnualIndemnizacion decimal(10, 2) default 0.00 not null,
    bonifAfectaPromedioAguinaldo          decimal(10, 2) default 0.00 not null,
    bonifAfectaPromedioBono               decimal(10, 2) default 0.00 not null,
    bonifAfectaPromedioVacaciones         decimal(10, 2) default 0.00 not null,
    constraint Liquidacion_ibfk_2
        foreign key (idEmpresa) references Empresa (id),
    constraint Liquidacion_ibfk_3
        foreign key (idPlaza) references Plaza (id)
);

create index idEmpresa
    on Liquidacion (idEmpresa);

create index idPlaza
    on Liquidacion (idPlaza);

create table Liquidaciones_Adiciones
(
    id                 int auto_increment
        primary key,
    idPlaza            int            null,
    tipoAdicion        varchar(255)   null,
    descripcionAdicion varchar(255)   null,
    montoAdicion       decimal(10, 2) null,
    estado             tinyint(1)     null,
    constraint Liquidaciones_Adiciones_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Liquidaciones_Adiciones (idPlaza);

create table Permisos_Denimville
(
    id               int auto_increment
        primary key,
    plaza            int          null,
    fechaYHoraInicio datetime     null,
    fechaYHoraFin    datetime     null,
    motivo           longtext     null,
    sinGoceDeSueldo  tinyint(1)   null,
    autoriza         varchar(255) null,
    ingreso          datetime     null,
    constraint Permisos_Denimville_ibfk_1
        foreign key (plaza) references Plaza (id),
    constraint Permisos_Denimville_ibfk_2
        foreign key (autoriza) references Colaborador (id)
);

create index autoriza
    on Permisos_Denimville (autoriza);

create index plaza
    on Permisos_Denimville (plaza);

create table Planilla_Vacaciones
(
    id                  int auto_increment
        primary key,
    idPlaza             int                         null,
    nombrePlanilla      varchar(255)                null,
    primerApellido      varchar(255)                null,
    segundoApellido     varchar(255)                null,
    apellidoCasada      varchar(255)                null,
    primerNombre        varchar(255)                null,
    segundoNombre       varchar(255)                null,
    otrosNombres        varchar(255)                null,
    apellidos           varchar(255)                null,
    nombres             varchar(255)                null,
    formaPago           varchar(255)                null,
    banco               varchar(255)                null,
    numeroCuentaBanco   varchar(255)                null,
    cuentaMonetaria     varchar(255)                null,
    jubiladoIgss        tinyint(1)                  null,
    periodoInicio       datetime                    null,
    periodoFinal        datetime                    null,
    fechaInicio         datetime                    null,
    fechaFin            datetime                    null,
    medioDia            tinyint(1)                  null,
    salarioPromedio     decimal(10, 2)              null,
    salarioBase         varchar(255)                null,
    precioDiaHabil      varchar(255)                null,
    precioDiaSeptimo    varchar(255)                null,
    diasHabiles         decimal(10, 2)              null,
    diasSeptimos        decimal(10, 2)              null,
    montoDiasHabiles    decimal(10, 2)              null,
    montoDiasSeptimos   decimal(10, 2)              null,
    montoTotal          decimal(10, 2)              null,
    montoBonosAPlanilla decimal(10, 2)              null,
    descuentoIgss       decimal(10, 2)              null,
    liquidoRecibir      decimal(10, 2)              null,
    Mom                 tinyint(1)                  null,
    GT                  tinyint(1)                  null,
    estado              tinyint(1)                  null,
    bonoAfectoPromedio  decimal(10, 2) default 0.00 not null,
    constraint Planilla_Vacaciones_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Planilla_Vacaciones (idPlaza);

create table PlanillasB14
(
    id                int auto_increment
        primary key,
    idPlaza           int            null,
    idPlanilla        int            null,
    idEmpresa         varchar(70)    null,
    nombres           varchar(255)   null,
    apellidos         varchar(255)   null,
    fechaDeAlta       datetime       null,
    base1             decimal(10, 2) null,
    base2             decimal(10, 2) null,
    base3             decimal(10, 2) null,
    base4             decimal(10, 2) null,
    base5             decimal(10, 2) null,
    base6             decimal(10, 2) null,
    base7             decimal(10, 2) null,
    base8             decimal(10, 2) null,
    base9             decimal(10, 2) null,
    base10            decimal(10, 2) null,
    base11            decimal(10, 2) null,
    base12            decimal(10, 2) null,
    promedio          decimal(10, 2) null,
    inicioB14         datetime       null,
    corteB14          datetime       null,
    dias              int            null,
    bono14            decimal(10, 2) null,
    anticipo          decimal(10, 2) null,
    liquidoRecibir    decimal(10, 2) null,
    meses             varchar(255)   null,
    sumaSalariosBase  decimal(10, 2) null,
    formaPago         varchar(255)   null,
    banco             int            null,
    numeroCuentaBanco varchar(255)   null,
    cuentaMonetaria   varchar(255)   null,
    estado            tinyint(1)     null,
    constraint PlanillasB14_ibfk_2
        foreign key (idPlanilla) references Planilla (id),
    constraint PlanillasB14_ibfk_3
        foreign key (idEmpresa) references Empresa (id),
    constraint PlanillasB14_ibfk_4
        foreign key (banco) references Banco (id),
    constraint PlanillasB14_ibfk_5
        foreign key (idPlaza) references Plaza (id)
);

create index banco
    on PlanillasB14 (banco);

create index idEmpresa
    on PlanillasB14 (idEmpresa);

create index idPlanilla
    on PlanillasB14 (idPlanilla);

create index idPlaza
    on PlanillasB14 (idPlaza);

create table Planillas_Aguinaldo
(
    id                int auto_increment
        primary key,
    idPlaza           int            null,
    idPlanilla        int            null,
    nombres           varchar(255)   null,
    apellidos         varchar(255)   null,
    fechaIngreso      datetime       null,
    base1             decimal(10, 2) null,
    base2             decimal(10, 2) null,
    base3             decimal(10, 2) null,
    base4             decimal(10, 2) null,
    base5             decimal(10, 2) null,
    base6             decimal(10, 2) null,
    base7             decimal(10, 2) null,
    base8             decimal(10, 2) null,
    base9             decimal(10, 2) null,
    base10            decimal(10, 2) null,
    base11            decimal(10, 2) null,
    base12            decimal(10, 2) null,
    promedio          decimal(10, 2) null,
    inicioAguinaldo   datetime       null,
    corteAguinaldo    datetime       null,
    dias              int            null,
    aguinaldo         decimal(10, 2) null,
    anticipo          decimal(10, 2) null,
    liquidoRecibir    decimal(10, 2) null,
    meses             varchar(255)   null,
    sumaSalariosBase  decimal(10, 2) null,
    formaPago         varchar(255)   null,
    banco             int            null,
    numeroCuentaBanco varchar(255)   null,
    cuentaMonetaria   varchar(255)   null,
    estado            tinyint(1)     null,
    idEmpresa         varchar(70)    null,
    constraint Planillas_Aguinaldo_ibfk_2
        foreign key (idPlanilla) references Planilla (id),
    constraint Planillas_Aguinaldo_ibfk_3
        foreign key (idEmpresa) references Empresa (id),
    constraint Planillas_Aguinaldo_ibfk_4
        foreign key (idPlaza) references Plaza (id)
);

create index idEmpresa
    on Planillas_Aguinaldo (idEmpresa);

create index idPlanilla
    on Planillas_Aguinaldo (idPlanilla);

create index idPlaza
    on Planillas_Aguinaldo (idPlaza);

create index banco
    on Plaza (banco);

create index centro
    on Plaza (centro);

create index idColaborador
    on Plaza (idColaborador);

create index idPlanilla
    on Plaza (idPlanilla);

create table PlazaPlanillaPago
(
    id                          int auto_increment
        primary key,
    idPlaza                     int                         null,
    nombrePlanilla              varchar(255)                null,
    primerApellido              varchar(255)                null,
    segundoApellido             varchar(255)                null,
    apellidoCasada              varchar(255)                null,
    primerNombre                varchar(255)                null,
    segundoNombre               varchar(255)                null,
    otrosNombres                varchar(255)                null,
    apellidos                   varchar(255)                null,
    nombres                     varchar(255)                null,
    formaPago                   varchar(255)                null,
    banco                       int                         null,
    numeroCuentaBanco           varchar(255)                null,
    cuentaMonetaria             varchar(255)                null,
    jubiladoIgss                tinyint(1)                  null,
    autorizaPagoCheque          tinyint(1)                  null,
    periodoInicio               datetime                    null,
    periodoFinal                datetime                    null,
    periodo                     varchar(255)                null,
    salarioBase                 decimal(10, 2)              null,
    bonifNoAfectaPasivos        decimal(10, 2)              null,
    bonifAfectaPasivos          decimal(10, 2)              null,
    diasLaborados               decimal(10, 2)              null,
    diasHabiles                 decimal(10, 2)              null,
    diasSeptimos                decimal(10, 2)              null,
    horasExtrasSimples          decimal(10, 2)              null,
    horasExtrasDobles           decimal(10, 2)              null,
    salarioBaseDevengado        decimal(10, 2)              null,
    bonifSalarioDevengado       decimal(10, 2)              null,
    bonoProdNoAfecto            decimal(10, 2)              null,
    bonoProdAfecto              decimal(10, 2)              null,
    bonificacion372001Devengado decimal(10, 2)              null,
    montoHorasExtrasSimples     decimal(10, 2)              null,
    montoHorasExtrasDobles      decimal(10, 2)              null,
    comisiones                  decimal(10, 2)              null,
    anticipo                    decimal(10, 2)              null,
    devolucionIsr               decimal(10, 2)              null,
    periodoDevolucionIsr        datetime                    null,
    totalDevengado              decimal(10, 2)              null,
    igss                        decimal(10, 2)              null,
    descuentoIsr                decimal(10, 2)              null,
    descuentoMedicina           decimal(10, 2)              null,
    descuentoAlmuerzos          decimal(10, 2)              null,
    descuentoJudicial           decimal(10, 2)              null,
    descuentoAnticipo           decimal(10, 2)              null,
    descuentoCarneIrtra         decimal(10, 2)              null,
    descuentoUniformes          decimal(10, 2)              null,
    descuentoBoletoOrnato       decimal(10, 2)              null,
    descuentoBI                 decimal(10, 2)              null,
    descuentoIsrNoAplicado      decimal(10, 2)              null,
    periodoIsrNoAplicado        datetime                    null,
    totalDeducciones            decimal(10, 2)              null,
    liquidoRecibir              decimal(10, 2)              null,
    montoPagadoAjuste           decimal(10, 2)              null,
    fechaPagoAjuste             datetime                    null,
    estado                      varchar(70)                 null,
    idEmpresa                   varchar(70)                 null,
    reintegro                   decimal(10, 2)              null,
    descuentoHoras              decimal(10, 2)              null,
    bonifHorasExtrasSimples     decimal(10, 2) default 0.00 not null,
    bonifHorasExtrasDobles      decimal(10, 2) default 0.00 not null,
    constraint PlazaPlanillaPago_ibfk_2
        foreign key (banco) references Banco (id),
    constraint PlazaPlanillaPago_ibfk_3
        foreign key (idEmpresa) references Empresa (id),
    constraint PlazaPlanillaPago_ibfk_4
        foreign key (idPlaza) references Plaza (id)
);

create index banco
    on PlazaPlanillaPago (banco);

create index idEmpresa
    on PlazaPlanillaPago (idEmpresa);

create index idPlaza
    on PlazaPlanillaPago (idPlaza);

create table RHA
(
    id             int auto_increment
        primary key,
    idEmpresa      varchar(70)    null,
    idPlanilla     int            null,
    nombrePlanilla varchar(255)   null,
    inicioPeriodo  datetime       null,
    finPeriodo     datetime       null,
    aguinaldo      decimal(10, 2) null,
    anticipo       decimal(10, 2) null,
    liquidoRecibir decimal(10, 2) null,
    estado         tinyint(1)     null,
    constraint RHA_ibfk_1
        foreign key (idEmpresa) references Empresa (id),
    constraint RHA_ibfk_2
        foreign key (idPlanilla) references Planilla (id)
);

create index idEmpresa
    on RHA (idEmpresa);

create index idPlanilla
    on RHA (idPlanilla);

create table RHB
(
    id             int auto_increment
        primary key,
    idEmpresa      varchar(70)    null,
    idPlanilla     int            null,
    nombrePlanilla varchar(255)   null,
    inicioPeriodo  datetime       null,
    finPeriodo     datetime       null,
    bono14         decimal(10, 2) null,
    anticipo       decimal(10, 2) null,
    liquidoRecibir decimal(10, 2) null,
    estado         tinyint(1)     null,
    constraint RHB_ibfk_1
        foreign key (idEmpresa) references Empresa (id),
    constraint RHB_ibfk_2
        foreign key (idPlanilla) references Planilla (id)
);

create index idEmpresa
    on RHB (idEmpresa);

create index idPlanilla
    on RHB (idPlanilla);

create table RHP
(
    id                       int auto_increment
        primary key,
    idEmpresa                varchar(70)    null,
    idPlanilla               int            null,
    nombrePlanilla           varchar(255)   null,
    inicioPeriodoPlanilla    datetime       null,
    finPeriodoPlanilla       datetime       null,
    salarioBaseDevengado     decimal(10, 2) null,
    bonifDecreto             decimal(10, 2) null,
    comisiones               decimal(10, 2) null,
    anticiposYreintegros     decimal(10, 2) null,
    isr                      decimal(10, 2) null,
    almuerzo                 decimal(10, 2) null,
    medicina                 decimal(10, 2) null,
    descuentoJudicial        decimal(10, 2) null,
    bantrab                  decimal(10, 2) null,
    bi                       decimal(10, 2) null,
    boletoOrnato             decimal(10, 2) null,
    otros                    decimal(10, 2) null,
    isrAjuste                decimal(10, 2) null,
    liquidoRecibir           decimal(10, 2) null,
    igss                     decimal(10, 2) null,
    montoHorasExtrasSimples  decimal(10, 2) null,
    montoHorasExtrasDobles   decimal(10, 2) null,
    totalDeducciones         decimal(10, 2) null,
    totalDevengado           decimal(10, 2) null,
    igssVacaciones           decimal(10, 2) null,
    totalDevengadoVacaciones decimal(10, 2) null,
    liquidoRecibirVacaciones decimal(10, 2) null,
    estado                   tinyint(1)     null,
    constraint RHP_ibfk_1
        foreign key (idEmpresa) references Empresa (id),
    constraint RHP_ibfk_2
        foreign key (idPlanilla) references Planilla (id)
);

create index idEmpresa
    on RHP (idEmpresa);

create index idPlanilla
    on RHP (idPlanilla);

create table Referencias_Laborales
(
    id            int auto_increment
        primary key,
    idEmpresa     varchar(70) null,
    idColaborador varchar(70) null,
    idPlaza       int         null,
    referencias   mediumtext  null
);

create table Reintegros
(
    id                 int auto_increment
        primary key,
    idPlaza            int            null,
    idPPP              int            null,
    gastosGenerales    decimal(10, 2) null,
    kilometraje        decimal(10, 2) null,
    celular            decimal(10, 2) null,
    alimentacion       decimal(10, 2) null,
    depreciacion       decimal(10, 2) null,
    parqueos           decimal(10, 2) null,
    carWash            decimal(10, 2) null,
    actividades        decimal(10, 2) null,
    liquidoRecibir     decimal(10, 2) null,
    fechaInicioPeriodo datetime       null,
    fechaFinPeriodo    datetime       null,
    isr                decimal(10, 2) null,
    anticipo           decimal(10, 2) null,
    estado             tinyint(1)     null,
    constraint Reintegros_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Reintegros (idPlaza);

create table Solicitud_IRTRA
(
    id             int auto_increment
        primary key,
    tipo           varchar(20)  not null,
    fechaSolicitud datetime     not null,
    conyuge        tinyint      not null,
    firma          longtext     not null,
    idColaborador  varchar(100) not null,
    idEmpresa      varchar(100) not null,
    estado         varchar(30)  not null,
    constraint Solicitud_IRTRA_ibfk_1
        foreign key (idColaborador) references Colaborador (id),
    constraint Solicitud_IRTRA_ibfk_2
        foreign key (idEmpresa) references Empresa (id)
);

create index idColaborador
    on Solicitud_IRTRA (idColaborador);

create index idEmpresa
    on Solicitud_IRTRA (idEmpresa);

create table Suspenciones
(
    id                 int auto_increment
        primary key,
    idPlaza            int          null,
    fechaInicio        datetime     null,
    fechaFin           datetime     null,
    fechaInicioPeriodo datetime     null,
    fechaFinPeriodo    datetime     null,
    tipoSuspension     varchar(255) null,
    fechaDeAlta        datetime     null,
    constraint Suspenciones_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Suspenciones (idPlaza);

create table Suspenciones_Disciplinarias
(
    id                            int auto_increment
        primary key,
    idPlaza                       int        null,
    fechaInicio                   datetime   null,
    fechaFin                      datetime   null,
    diasHabiles                   int        null,
    diasSeptimos                  int        null,
    fechaInicioPeriodo            datetime   null,
    fechaFinPeriodo               datetime   null,
    motivoSuspencionDisciplinaria longtext   null,
    noDescontarUltimoSeptimo      tinyint(1) null,
    constraint Suspenciones_Disciplinarias_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Suspenciones_Disciplinarias (idPlaza);

create table Suspensiones_Denimville
(
    id          int auto_increment
        primary key,
    plaza       int          null,
    tipo        longtext     null,
    fechaInicio date         null,
    fechaFin    date         null,
    autoriza    varchar(255) null,
    ingreso     datetime     null,
    constraint Suspensiones_Denimville_ibfk_1
        foreign key (plaza) references Plaza (id),
    constraint Suspensiones_Denimville_ibfk_2
        foreign key (autoriza) references Colaborador (id)
);

create index autoriza
    on Suspensiones_Denimville (autoriza);

create index plaza
    on Suspensiones_Denimville (plaza);

create table Suspensiones_Disciplinarias_Denimville
(
    id                 int auto_increment
        primary key,
    plaza              int          null,
    tipo               longtext     null,
    fechaInicio        date         null,
    fechaFin           date         null,
    noDescontarSeptimo tinyint(1)   null,
    autoriza           varchar(255) null,
    ingreso            datetime     null,
    constraint Suspensiones_Disciplinarias_Denimville_ibfk_1
        foreign key (plaza) references Plaza (id),
    constraint Suspensiones_Disciplinarias_Denimville_ibfk_2
        foreign key (autoriza) references Colaborador (id)
);

create index autoriza
    on Suspensiones_Disciplinarias_Denimville (autoriza);

create index plaza
    on Suspensiones_Disciplinarias_Denimville (plaza);

create table Tipo_Puesto
(
    id                             int auto_increment
        primary key,
    idEmpresa                      varchar(70)  null,
    nombreTipo                     longtext     null,
    objetivo                       longtext     null,
    funcionesPrincipales           longtext     null,
    competencias                   longtext     null,
    educacion                      longtext     null,
    experienciaLaboral             longtext     null,
    habilidadeEspecificas          longtext     null,
    factoresAmbientalesyFisicos    longtext     null,
    informacionEspecifica          longtext     null,
    departamento                   varchar(255) null,
    codigoOcupacion                varchar(25)  null,
    jornadaLaboral                 longtext     null,
    resumenJornada                 longtext     null,
    tipoPuestoJefe                 int          null,
    contractOptionalDefaultClauses varchar(999) null,
    contractCustomClauses          longtext     null,
    tiempoParcial                  tinyint      null,
    codigoOcupacionMintrab         varchar(10)  null,
    constraint Tipo_Puesto_ibfk_1
        foreign key (idEmpresa) references Empresa (id),
    constraint Tipo_Puesto_ibfk_2
        foreign key (tipoPuestoJefe) references Tipo_Puesto (id)
);

create table Puesto
(
    id                    int auto_increment
        primary key,
    idEmpresa             varchar(70)  null,
    nombrePuesto          varchar(255) null,
    correlativo           int          null,
    ocupante              int          null,
    padre                 int          null,
    idTipoPuesto          int          null,
    jornadaLaboral        longtext     null,
    resumenJornada        longtext     null,
    jornadaTextual        longtext     null,
    resumenJornadaTextual longtext     null,
    constraint Puesto_ibfk_1
        foreign key (idEmpresa) references Empresa (id),
    constraint Puesto_ibfk_2
        foreign key (padre) references Puesto (id),
    constraint Puesto_ibfk_3
        foreign key (ocupante) references Plaza (id),
    constraint Puesto_ibfk_4
        foreign key (idTipoPuesto) references Tipo_Puesto (id)
);

create index idEmpresa
    on Puesto (idEmpresa);

create index idTipoPuesto
    on Puesto (idTipoPuesto);

create index ocupante
    on Puesto (ocupante);

create index padre
    on Puesto (padre);

create index idEmpresa
    on Tipo_Puesto (idEmpresa);

create index tipoPuestoJefe
    on Tipo_Puesto (tipoPuestoJefe);

create table Trabajos_Anteriores
(
    id            int auto_increment
        primary key,
    idPlaza       int            null,
    ingresos      decimal(12, 2) null,
    igss          decimal(12, 2) null,
    isrDescontado decimal(12, 2) null,
    periodoInicio datetime       null,
    periodoFin    datetime       null,
    constraint Trabajos_Anteriores_ibfk_1
        foreign key (idPlaza) references Plaza (id)
);

create index idPlaza
    on Trabajos_Anteriores (idPlaza);

create table Turnos
(
    id          int auto_increment
        primary key,
    codigo      varchar(255) not null,
    descripcion longtext     not null,
    constraint codigo
        unique (codigo)
);

create table Collaborador_Turno_Denimville
(
    id       int auto_increment
        primary key,
    plaza    int          not null,
    turno    int          not null,
    fecha    date         null,
    autoriza varchar(255) null,
    constraint Collaborador_Turno_Denimville_ibfk_1
        foreign key (plaza) references Plaza (id),
    constraint Collaborador_Turno_Denimville_ibfk_2
        foreign key (turno) references Turnos (id),
    constraint Collaborador_Turno_Denimville_ibfk_3
        foreign key (autoriza) references Colaborador (id)
);

create table Vacaciones_Denimville
(
    id                 int auto_increment
        primary key,
    plaza              int          null,
    fechaInicio        date         null,
    fechaFin           date         null,
    medioDia           tinyint(1)   null,
    periodoEnQueAplica varchar(255) null,
    autoriza           varchar(255) null,
    ingreso            datetime     null,
    constraint Vacaciones_Denimville_ibfk_1
        foreign key (plaza) references Plaza (id),
    constraint Vacaciones_Denimville_ibfk_2
        foreign key (autoriza) references Colaborador (id)
);

create index autoriza
    on Vacaciones_Denimville (autoriza);

create index plaza
    on Vacaciones_Denimville (plaza);

create table Vacaciones_Pendientes
(
    id             int auto_increment
        primary key,
    codigoPlaza    varchar(70) null,
    idPlanilla     int         null,
    fechaInicio    datetime    null,
    fechaFin       datetime    null,
    periodoInicio  datetime    null,
    periodoFinal   datetime    null,
    diaSolicitud   datetime    null,
    medioDia       tinyint(1)  null,
    diasPendientes int         null,
    empresa        varchar(70) null,
    estado         varchar(70) null,
    constraint Vacaciones_Pendientes_ibfk_1
        foreign key (empresa) references Empresa (id),
    constraint Vacaciones_Pendientes_ibfk_2
        foreign key (idPlanilla) references Planilla (id)
);

create index empresa
    on Vacaciones_Pendientes (empresa);

create index idPlanilla
    on Vacaciones_Pendientes (idPlanilla);

create table auth
(
    id                varchar(70)  not null
        primary key,
    emailPersonal     varchar(255) null,
    contrasenaUsuario varchar(255) null
);