import React from 'react'
import { useState } from 'react'
import { addPuestosRequest } from '../services/api'

export const useAddPuestos = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addPuestos = async(name, workday, areaOrDepartament, occupationCode, occupation) =>{
        setIsLoading(true)
        const Puestos = {
            name,
            workday,
            areaOrDepartament,
            occupationCode,
            occupation
        }
        try {
            const response = await addPuestosRequest(Puestos)
            console.log('Server response:', response);
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            console.log('Error:', err)
            return false
        }
    }

    return {
        isLoading,
        addPuestos
    }
}
