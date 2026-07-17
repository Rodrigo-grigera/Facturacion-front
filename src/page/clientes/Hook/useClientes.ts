import { useEffect, useState } from "react";
import type { Cliente, FetchState, response } from "../../../types/types";
import { ClientesFetch } from "../../../service/Service";


export function useClientes(){
    const [state, setState] = useState<FetchState<response<Cliente>>>({status:'idle'});

    useEffect(()=>{

        const controller = new AbortController();

        setState({status: 'loading'})

        const getClientes = async () =>{
            try {
                
                const resp = await ClientesFetch(controller);
                setState({status: 'success',data: resp })

            } catch (error) {
                if(error instanceof Error && error.name === 'AbortError'){
                    return;
                }
                setState({status: 'error', error : `Fallo la conexion ${error}`})
            }
        }
        getClientes()

        return ()=> {controller.abort()}
        
    },[])
        
    return {state}
  
}
