import { createContext, useState } from "react";
import { useContext } from "react";

const Apicontext = createContext(null);

export const useApi = ()=>{
    const Value = useContext(Apicontext)
    return Value;
}


export const ContextProvider=({children})=>{
    const Api = 'https://ammr-project.vercel.app';
   

    return(
        <Apicontext.Provider value={{Api}}>
            {children}
        </Apicontext.Provider>
    )


}