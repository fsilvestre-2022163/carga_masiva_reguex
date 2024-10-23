import React, { useState } from 'react';
import { getEmpresasRequest } from '../services/api';

export const useGetEmpresas = () => {
    const [empresas, setEmpresas] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getEmpresas = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getEmpresasRequest();
            console.log('Server response:', response.data);
            if (response.error) {
                setError(response.err);
            } else {
                setEmpresas(response.data);
            }
        } catch (err) {
            console.log('Error:', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        empresas,
        isLoading,
        error,
        getEmpresas
    };
}
