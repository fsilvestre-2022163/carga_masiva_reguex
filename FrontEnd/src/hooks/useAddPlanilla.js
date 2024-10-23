import React from 'react'
import { useState } from 'react'
import { addPlanillaRequest } from '../services/api'

export const useAddPlanilla = () => {
    const [isLoading, setIsLoading] = useState(false)

    const addPlanilla = async (name, paymentFrequency, rotatingShifts, workSaturday) => {
        setIsLoading(true)
        const Planilla = {
            name,
            paymentFrequency,
            rotatingShifts,
            workSaturday
        }
        try {
            const response = await addPlanillaRequest(Planilla);
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
        addPlanilla,
        isLoading
    }



}
