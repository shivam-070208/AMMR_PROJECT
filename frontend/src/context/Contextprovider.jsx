import { createContext, useState } from "react";
import { useContext } from "react";

const Apicontext = createContext(null);

export const useApi = ()=>{
    const Value = useContext(Apicontext)
    return Value;
}


export const ContextProvider=({children})=>{
    const Api = 'http://localhost:8000';
   

    return(
        <Apicontext.Provider value={{Api}}>
            {children}
        </Apicontext.Provider>
    )


}