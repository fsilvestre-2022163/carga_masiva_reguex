import React from 'react'
import { useState } from 'react'
import { addColaboradoresRequest } from '../services/api'

export const useAddColaboradores = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addColaboradores = async (plazaId, firstName, secondName, otherName, firstSurname, secondSurname, birthdate, DPI, email, planilla, workCenter, jobPosition, currentBaseSalary, bonus, typeContract, jobStartDate, dateEndContract, jobEndDate) => {
        setIsLoading(true)
        const Colaboradores = {
            plazaId,
            firstName,
            secondName,
            otherName,
            firstSurname,
            secondSurname,
            birthdate,
            DPI,
            email,
            planilla,
            workCenter,
            jobPosition,
            currentBaseSalary,
            bonus,
            typeContract,
            jobStartDate,
            dateEndContract,
            jobEndDate
        }
        try {
            const response = await addColaboradoresRequest(Colaboradores);
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
        isLoading,
        addColaboradores
    }
}
