import { useEffect, useState } from "react";
import type { FetchState, Producto, response } from "../../../types/types";
import { ProductosFetch } from "../../../service/Service";


export function useProducts() {
    const [state, setState] = useState<FetchState<response<Producto>>>({ status: 'idle' })

    useEffect(() => {
        const controller = new AbortController();

        setState({ status: 'loading' });

        const getProducts = async () => {

            try {
                const resp = await ProductosFetch(controller);
                setState({ status: 'success', data: resp })

            } catch(error) {
                if(error instanceof Error && error.name === 'AbortError'){
                    return;
                }
                setState({status:'error', error: `Fallo de conexion: ${error}`})
            }
            
        }
        getProducts()
        
        return ()=>{controller.abort()}
    }, [])

    return {state}
}