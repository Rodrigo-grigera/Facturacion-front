import { useEffect, useState } from "react";
import type { Cliente, FetchState, response } from "../../../types/types";
import { ClientesFetch } from "../../../service/Service";


export function useClientes() {
    const [state, setState] = useState<FetchState<response<Cliente>>>({ status: 'idle' });

    useEffect(() => {

        const controller = new AbortController();

        setState({ status: 'loading' })

        const getClientes = async () => {
            try {

                const resp = await ClientesFetch(controller);
                if (!resp.data) {
                    throw new Error('No se pudieron cargar los clientes')
                }
                setState({ status: 'success', data: resp })

            } catch (error) {
                if (error instanceof Error && error.name === 'AbortError') {
                    return;
                }
                if (error instanceof Error && error.message === 'Failed to fetch') { //si el back no esta corriendo muestra este error
                    setState({ status: 'error', error: 'No se pudo conectar con el servidor. Verifique su conexión o intente más tarde.' });
                    return;
                }
                setState({ status: 'error', error: `Fallo la conexion ${error}` })
            }
        }
        getClientes()

        return () => { controller.abort() }

    }, [])

    return { state }

}
