import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000
})


//CargaMasiva

export const addCargaMasivaRequest = async (data) => {
    try {
        const addCargaMasiva = await apiClient.post('/carga-masiva', data)
        return addCargaMasiva
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//Centro de Trabajo
export const addWorkCenterRequest = async (data) => {
    try {
        const addWorkCenter = await apiClient.post('/centro-de-trabajo', data)
        return addWorkCenter
    } catch (err) {
        return {
            error: true,
            err
        };
    }
}

//Planillas

export const addPlanillaRequest = async (data) => {
    try {
        const addPlanilla = await apiClient.post('/planillas', data)
        return addPlanilla
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}


//Puestos

export const addPuestosRequest = async (data) => {
    try {
        const addPuestos = await apiClient.post('/puestos', data)
        return addPuestos
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}

//Colaboradores

export const addColaboradoresRequest = async (data) => {
    try {
        const addColaboradores = await apiClient.post('/colaboradores', data)
        return addColaboradores
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}


//Empresas

export const getEmpresasRequest = async () => {
    try {
        const getEmpresas = await apiClient.get('/empresas')
        return getEmpresas
    } catch (err) {
        return {
            error: true,
            err
        }
    }
}