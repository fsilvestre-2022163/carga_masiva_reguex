import React from 'react'
import { useState } from 'react'
import { addCargaMasivaRequest } from '../services/api'

export const useAddCargaMasiva = () => {
    const [isLoading, setIsLoading] = useState(false)
    
    const addCargaMasiva = async (idCompany, centroDeTrabajo, colaboradores, planillas, tipoPuestos) => {
        setIsLoading(true)

        const CargaMasiva = {
            idCompany,
            centroDeTrabajo,
            colaboradores,
            planillas,
            tipoPuestos
        }

        try {
            const response = await addCargaMasivaRequest(CargaMasiva);
            console.log('Server response:', response);
            setIsLoading(false)
            return true
        } catch (err) {
            setIsLoading(false)
            console.log('Error:', err)
            return false
        }
    }
    return {
        addCargaMasiva,
        isLoading
    }
}
