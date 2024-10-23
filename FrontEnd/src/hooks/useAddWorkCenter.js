import React from 'react'
import { useState } from "react";
import { addWorkCenterRequest } from "../services/api";

export const useAddWorkCenter = () => {
    const [isLoading, setIsLoading] = useState(false);

    const addWorkCenter = async (nameWorkCenter, departament, municipalty, zone, address, workCenterContact, contactPhone, emailContact, idDepartament, idMunicipalty) => {
        setIsLoading(true)
        const WorkCenter = {
            nameWorkCenter,
            departament,
            municipalty,
            zone,
            address,
            workCenterContact,
            contactPhone,
            emailContact,
            idDepartament,
            idMunicipalty
        }
        try {
            const response = await addWorkCenterRequest(WorkCenter);
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
        addWorkCenter,
        isLoading
    }
}
