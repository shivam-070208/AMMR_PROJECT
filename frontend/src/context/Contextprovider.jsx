import { createContext } from "react";
import { useContext } from "react";

const Apicontext = createContext(null);

export const useApi = ()=>{
    const Value = useContext(Apicontext)
    return Value;
}


export const ContextProvider=({children})=>{
    const Api = 'https://ammr-project.onrender.com';
   

    return(
        <Apicontext.Provider value={{Api}}>
            {children}
        </Apicontext.Provider>
    )


}