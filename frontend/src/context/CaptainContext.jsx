import React from 'react'
import {createContext,useState,useContext   } from 'react';

export const CaptainDataContext = createContext(); 


export  const useCaptain = () => {
    const context = useContext(CaptainDataContext);
    if (!context) {
        throw new Error('CaptainContext must be used within a CaptainProvider');
    }
    return context;
}

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);   
    const updateCaptain = (data) => {
        setCaptain(data);
    }

    const value = { captain, setCaptain, loading, setLoading, error, setError, updateCaptain };

    return (
        <CaptainContext.Provider value={value}>
            {children}
        </CaptainContext.Provider>
    )

}

export default CaptainContext