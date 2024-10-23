import { useState, useEffect } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import XLSX from 'xlsx';
import {
    Snackbar,
    Alert,
    Pagination,
    Fab,
    Card,
    CardContent,
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Button
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import NavigationIcon from '@mui/icons-material/Navigation';
import { FileDropzone } from '../../../components/file-dropzone';
import { useAddColaboradores } from '../../../hooks/useAddColaboradores';
import { useAddWorkCenter } from '../../../hooks/useAddWorkCenter';
import { useAddPuestos } from '../../../hooks/useAddPuestos';
import { useAddPlanilla } from '../../../hooks/useAddPlanilla';
import { useGetEmpresas } from '../../../hooks/useGetEmpresas';
import { useAddCargaMasiva } from '../../../hooks/useAddCargaMasiva';

import { Box } from '@mui/system';

const TableList = () => {
    const { addWorkCenter, isLoading } = useAddWorkCenter();
    const { addColaboradores, isLoadingColaboradores } = useAddColaboradores();
    const { addPuestos, isLoadingPuestos } = useAddPuestos();
    const { addPlanilla, isLoadingPlanillas } = useAddPlanilla();
    const { empresas, isLoadingEmpresas, getEmpresas } = useGetEmpresas();
    const { addCargaMasiva, isLoadingCargaMasiva } = useAddCargaMasiva();
    const [files, setFiles] = useState([]);
    const [data, setData] = useState([]);
    const [sheetNames, setSheetNames] = useState([]);
    const [selectedSheet, setSelectedSheet] = useState('');
    const [allData, setAllData] = useState({});
    const [selectedPage, setSelectedPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [savingEntity, setSavingEntity] = useState('');

    // ---------- Nombre de las tablas y columnas del Excel ------------
    const entityMap = {
        'Centro de Trabajo': {
            fields: {
                nameWorkCenter: 'Nombre del centro de trabajo',
                departament: 'Departamento',
                municipalty: 'Municipio',
                zone: 'Zona',
                address: 'Dirección',
                workCenterContact: 'Contacto en el centro de trabajo',
                contactPhone: 'Telefóno del contacto',
                emailContact: 'Correo electrónico del contacto',
                idMunicipalty: 'IdMuni',
                idDepartament: 'IdDepartamento',

            },
        },
        'Planillas': {
            fields: {
                name: 'Nombre de la planilla',
                paymentFrequency: 'Frequencia de pago',
                rotatingShifts: 'Turnos rotativos',
                workSaturday: 'Trabajan sábado'
            },
        },
        'Puestos': {
            fields: {
                name: 'Nombre del Puesto',
                workday: 'Jornada (Especifique días laborados y hora de entrada y salida)',
                areaOrDepartament: 'Área o Departamento del puesto',
                occupationCode: 'Código Ocupación',
                occupation: 'Ocupación',
            },
        },
        'Colaboradores': {
            fields: {
                plazaId: 'Plaza ID',
                firstName: 'Primer nombre',
                secondName: 'Segundo nombre',
                otherName: 'Otros nombres',
                firstSurname: 'Primer apellido',
                secondSurname: 'Segundo apellido',
                birthdate: 'Fecha de nacimiento',
                DPI: 'DPI',
                gender: 'Género',
                email: 'Correo',
                planilla: 'Planilla',
                workCenter: 'Centro de trabajo',
                jobPosition: 'Puesto laboral',
                currentBaseSalary: 'Salario Base Actual',
                bonus: 'Bonificación 37-2001 Actual',
                methodOfPayment: 'Forma de pago',
                bank: 'Código Banco',
                typeAccount: 'Tipo Cuenta',
                accountNumber: 'Número de cuenta',
                typeContract: 'Tipo de contrato',
                jobStartDate: 'Fecha de Alta',
                dateEndContract: 'Fecha de finalización contrato',
                jobEndDate: 'Fecha de Baja',

            },
        }
    };
    // --------------------------------------------


    // ---------- Funcion para convertir la hora -------------
    const ExcelDateToJSDate = (serial) => {
        // Compensar el bug de Excel de 1900
        if (serial > 59) {
            serial -= -1;
        }
        
        // Base de fecha en Unix es 1970, pero en Excel es 1900, compensamos esto restando 25569
        const utc_days = Math.floor(serial - 25569);
        const utc_value = utc_days * 86400;  // Segundos en un día
        const date_info = new Date(utc_value * 1000);  // Convertir segundos a milisegundos
    
        // Obtener la fracción del día
        const fractional_day = serial - Math.floor(serial) + 0.0000001;  // Compensar problemas de punto flotante
        const total_seconds = Math.floor(86400 * fractional_day);
        
        const seconds = total_seconds % 60;
        const minutes = Math.floor(total_seconds / 60) % 60;
        const hours = Math.floor(total_seconds / (60 * 60));
    
        // Devolver la fecha completa con la hora
        return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
    };
    
    // --------------------------------------------

    // ---------- Cargar datos del archivo de excel ----------
    const handleDrop = (newFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);

        newFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const workbook = XLSX.read(e.target.result, { type: 'binary' });
                const names = workbook.SheetNames;
                const sheetsToProcess = names.slice(1, 5); // Selecciona las hojas 2, 3, 4 y 5. Este es como un filtro de hojas
                const allSheetsData = {};
                sheetsToProcess.forEach(sheetName => {
                    const sheet = workbook.Sheets[sheetName];
                    // Convierto la hoja en un array de arrays para obtener la tercera fila
                    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                    // Toma la tercera fila (índice 2) para usar como encabezado
                    const headerRow = json[2];
                    // Toma las filas a partir de la cuarta fila
                    const dataRows = json.slice(3);
                    // Crear un array de objetos con las claves del headerRow
                    const formattedData = dataRows.map(row => {
                        const rowData = {};
                        headerRow.forEach((key, index) => {
                            rowData[key] = row[index];
                        });
                        return rowData;
                    });

                    allSheetsData[sheetName] = formattedData;
                });
                setSheetNames(sheetsToProcess);
                setAllData(allSheetsData);
                if (sheetsToProcess.length > 0) {
                    setSelectedSheet(sheetsToProcess[0]); // Selecciona la primera hoja por defecto
                    setData(allSheetsData[sheetsToProcess[0]]);
                }
            };

            reader.readAsBinaryString(file);

        })
    }
    // ----------------------------------------



    // ---------- Cambiar de página --------------
    const handlePageChange = (event, value) => {
        setSelectedPage(value);
        const newSheet = sheetNames[value - 1];
        setSelectedSheet(newSheet);

        // Actualiza la tabla con los datos de la hoja seleccionada
        if (allData[newSheet]) {
            setData(allData[newSheet]);
        }
    };
    // ----------------------------------------

    // ---------- Eliminar un archivo --------------------
    const handleRemove = (file) => {
        setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
        setData([]);
        setSheetNames([]);
        setSelectedSheet('');
        setAllData({});
    };
    // ----------------------------------------


    // ---------- Eliminar todos los archivos ------------
    const handleRemoveAll = () => {
        setFiles([]);
        setData([]);
        setSheetNames([]);
        setSelectedSheet('');
        setAllData({});
    };
    // ----------------------------------------


    // ---------- Cambiar de hoja -------------------------
    const handleSheetChange = (event) => {
        const sheetName = event.target.value;
        setSelectedSheet(sheetName);

        if (allData[sheetName]) {
            setData(allData[sheetName]);
        }
    };
    // ----------------------------------------


    // ---------- Empresas -------------------------------
    useEffect(() => {
        getEmpresas();
    }, []);

    const handleCompanyChange = (event) => {
        const selectedEmpresa = empresas.find(empresa => empresa.id === event.target.value);
        setSelectedCompany(selectedEmpresa);
        console.log('Empresa seleccionada:', selectedEmpresa);
    };
    // ----------------------------------------


    //Guardar Todos los Datos -----------------
    const handleSaveData = async () => {
        if (Object.keys(allData).length === 0 || !selectedCompany) {
            alert('No hay datos para guardar o no has seleccionado una empresa');
            return;
        }

        const formattedData = {};

        for (const [entityType, entityData] of Object.entries(allData)) {
            formattedData[entityType] = entityData.map(row => {
                const formattedRow = {};
                for (const [key, field] of Object.entries(entityMap[entityType].fields)) {
                    const value = row[field] !== undefined ? String(row[field]).trim() : null;

                    if (field === 'Código Ocupación') {
                        if (value === '110') {
                            row[field] = '0110';  // Cambia específicamente '110' a '0110'
                        }
                    }

                    if (key === 'idDepartament' || key === 'idMunicipalty') {
                        formattedRow[key] = parseInt(value, 10);
                    } else if (key === 'birthdate' && value) {
                        const dateValue = ExcelDateToJSDate(parseFloat(value));
                        formattedRow[key] = dateValue.toISOString();
                    } else if (['dateEndContract'].includes(key) && value) {
                        const dateValue = ExcelDateToJSDate(parseFloat(value));
                        formattedRow[key] = dateValue.toISOString();
                    } else if (['jobStartDate'].includes(key) && value) {
                        const dateValue = ExcelDateToJSDate(parseFloat(value));
                        formattedRow[key] = dateValue.toISOString();

                    } else if (['jobEndDate'].includes(key) && value) {
                        const dateValue = ExcelDateToJSDate(parseFloat(value));
                        formattedRow[key] = dateValue.toISOString();

                    }
                    else {
                        formattedRow[key] = value;
                    }
                }
                return formattedRow;
            }).filter(row => row !== undefined);
        }

        const centroDeTrabajo = formattedData['Centro de Trabajo'] || [];
        const colaboradores = formattedData['Colaboradores'] || [];
        const planillas = formattedData['Planillas'] || [];
        const tipo_puestos = formattedData['Puestos'] || [];

        try {
            const success = await addCargaMasiva(
                selectedCompany.id,
                centroDeTrabajo,
                colaboradores,
                planillas,
                tipo_puestos
            );
            console.log(centroDeTrabajo, colaboradores, planillas, tipo_puestos, 'Empresa:', selectedCompany.id);
            if (success) {
                setSnackbarOpen(true);
            } else {
                alert('Error al guardar los datos');
            }
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            alert('Error al guardar los datos');
        }
    };
    // ----------------------------------------


    // Guardar los datos de una sola tabla ----
    // const handleSaveTable = async () => {
    //     if (!selectedSheet || !data.length) {
    //         alert('No hay datos para guardar en la hoja seleccionada');
    //         return;
    //     }
    //     // Convierte los campos numéricos a cadena y formatea los datos
    //     const formattedData = data.map(row => {
    //         const formattedRow = {};
    //         for (const [key, field] of Object.entries(entityMap[selectedSheet].fields)) {
    //             formattedRow[key] = String(row[field] || '').trim(); // Convertir a string y manejar valores vacíos
    //             const value = row[field] !== undefined ? String(row[field]).trim() : null;

    //             if (key === 'birthdate' && value) {
    //                 const dateValue = ExcelDateToJSDate(parseFloat(value));
    //                 formattedRow[key] = dateValue.toISOString();
    //             }
    //             if (key === 'dateEndContract' && value) {
    //                 const dateValue = ExcelDateToJSDate(parseFloat(value));
    //                 formattedRow[key] = dateValue.toISOString();
    //             }
    //             if (key === 'dischargeDate' && value) {
    //                 const dateValue = ExcelDateToJSDate(parseFloat(value));
    //                 formattedRow[key] = dateValue.toISOString();
    //             }
    //             if (key === 'idDepartament' || key === 'idMunicipalty') {
    //                 formattedRow[key] = parseInt(value, 10);
    //             }
    //         }
    //         return formattedRow;
    //     });



    //     // Determina el tipo de datos basado en el nombre de la hoja seleccionada
    //     const entityType = Object.keys(entityMap).find(key => key === selectedSheet);

    //     if (!entityType) {
    //         alert('Tipo de entidad no encontrado para la hoja seleccionada');
    //         return;
    //     }

    //     try {
    //         const savePromises = formattedData.map(async (row) => {
    //             if (entityType === 'Centro de Trabajo') {
    //                 return await addWorkCenter(
    //                     row.nameWorkCenter,
    //                     row.departament,
    //                     row.municipalty,
    //                     row.zone,
    //                     row.address,
    //                     row.workCenterContact,
    //                     row.contactPhone,
    //                     row.emailContact,
    //                     row.idDepartament,
    //                     row.idMunicipalty
    //                 );
    //             }
    //             if (entityType === 'Planillas') {
    //                 return await addPlanilla(
    //                     row.name,
    //                     row.paymentFrequency,
    //                     row.rotatingShifts,
    //                     row.workSaturday
    //                 );
    //             }
    //             if (entityType === 'Puestos') {
    //                 return await addPuestos(
    //                     row.name,
    //                     row.workday,
    //                     row.areaOrDepartament,
    //                     row.occupationCode,
    //                     row.occupation
    //                 );
    //             }
    //             if (entityType === 'Colaboradores') {
    //                 return await addColaboradores(
    //                     row.plazaId,
    //                     row.firstName,
    //                     row.secondName,
    //                     row.otherName,
    //                     row.firstSurname,
    //                     row.secondSurname,
    //                     row.birthdate,
    //                     row.DPI,
    //                     row.email,
    //                     row.planilla,
    //                     row.workCenter,
    //                     row.jobPosition,
    //                     row.currentBaseSalary,
    //                     row.bonus,
    //                     row.typeContract,
    //                     row.dischargeDate,
    //                     row.dateEndContract
    //                 );
    //             }
    //         });

    //         await Promise.all(savePromises);
    //         setSnackbarOpen(true);
    //     } catch (error) {
    //         console.error('Error al guardar los datos:', error);
    //     }
    // };
    // ----------------------------------------


   // Alerta flotante ------------------------
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    // ----------------------------------------

    return (
        <Box sx={{ m: 6 }}>
            <Card>
                <CardContent>
                    <Grid container spacing={4}>
                        <Grid item md={4} xs={12}>
                            <Typography variant="h2" >Tabla de Excel</Typography>
                            <Typography color="textSecondary" variant="body2" sx={{ mt: 1 }}>
                                Elije un documento de Excel para cargar los datos,
                                selecciona la empresa y la hoja de la que deseas cargar los datos.
                                Estos se mostrarán en la tabla para que puedas revisarlos antes de guardarlos.
                            </Typography>
                            <Grid item xs={12}>
                                <FormControl sx={{ mb: 3, mt: 3 }} fullWidth>
                                    <InputLabel>Selecciona la empresa</InputLabel>
                                    <Select value={selectedCompany?.id || ''} onChange={handleCompanyChange}>
                                        {isLoadingEmpresas ? (
                                            <MenuItem disabled>Cargando empresas...</MenuItem>
                                        ) : empresas && empresas.length > 0 ? (
                                            empresas.map((empresa) => (
                                                <MenuItem key={empresa.id} value={empresa.id}>
                                                    {empresa.nombreComercialEmpresa}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No hay empresas disponibles</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Número de Hoja</InputLabel>
                                    <Select value={selectedSheet} onChange={handleSheetChange}>
                                        {sheetNames.length === 0 ? (
                                            <MenuItem disabled value="">
                                                Elige un archivo para seleccionar una hoja
                                            </MenuItem>
                                        ) : (
                                            sheetNames.map((name) => (
                                                <MenuItem key={name} value={name}>
                                                    {name}
                                                </MenuItem>
                                            ))
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item md={7.9}>
                            <FileDropzone
                                accept=".xlsx"
                                files={files}
                                maxFiles={1}
                                maxSize={100000}
                                onDrop={handleDrop}
                                onRemove={handleRemove}
                                onRemoveAll={handleRemoveAll}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {data.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Button
                        size="small"
                        sx={{ mb: 2, mr: 2 }}
                        type="button"
                        variant="contained"
                        onClick={handleSaveData}
                    >
                        Guardar todos los datos
                    </Button>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {Object.keys(data[0]).map((key) => (
                                        <TableCell key={key}>{key}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={index}>
                                        {Object.keys(row).map((key, i) => (
                                            <TableCell key={i}>
                                                {key === 'Código Ocupación'
                                                    ? String(row[key]).padStart(4, '0') // Agrega un '0' si tiene menos de 4 dígitos
                                                    : key === 'Turnos rotativos' || key === 'Trabajan sábado'
                                                        ? (String(row[key]).toUpperCase() === 'TRUE' ? 'Sí' : 'No') // Convierte a "Sí" o "No" para estas columnas
                                                        : row[key] // Otros valores se muestran sin modificar
                                                }
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                </Box>
            )}

            <Fab
                color="secondary"
                sx={{
                    bottom: 16,
                    position: 'fixed',
                    right: 16,
                }}
            >
                {isLoading ? <NavigationIcon /> : <CheckIcon />}
            </Fab>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    ¡Datos guardados exitosamente!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TableList;
