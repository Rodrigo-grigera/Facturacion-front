
import { useNavigate } from "react-router-dom";
import { CardsCliente } from "./CardsClinete";
import { useClientes } from "./Hook/useClientes";
import styles from './styles.module.css'
import { Modal } from "../../componenetes/modal/Modal";
import { useState } from "react";
import { usePedidoContext } from "../../componenetes/context/PedidoContext";


export function Clientes() {
    const[open, setOpen] = useState(true);
    const { state } = useClientes();
    const navigate = useNavigate();


    if (state.status === 'idle' || state.status === 'loading') {
        return <p>Cargando clientes</p>
    }
    return (
        <>
        {state.status === 'error' && (
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <p>{state.error}</p>
            </Modal>
        )}
            <header className={styles.cont_title}>
                <h2>Mis Clientes</h2>
                <button onClick={() => navigate('/nuevoCliente')} className={styles.btn_cliente}>Crear Cliente</button>
            </header>

            <table className={styles.tabla}>
                <thead  >
                    <tr >
                        <th >Nombre</th>
                        <th>Apellido</th>
                        <th>Localidad</th>
                        <th>Dirección</th>
                        <th>Celular</th>
                    </tr>
                </thead>

                <tbody>
                    {state.status === 'success' ? (

                        state.data.data.map(cli => (<CardsCliente key={cli.id_cliente} clientes={cli} />)))

                        : (
                            <div className="error-placeholder">
                                <p>No se pudieron cargar los clientes: {state.error}</p>
                            </div>
                        )}
                </tbody>

            </table>

        </>

    )
}