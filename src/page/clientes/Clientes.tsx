
import { NavLink, useNavigate } from "react-router-dom";
import { CardsCliente } from "./CardsClinete";
import { useClientes } from "./Hook/useClientes";
import styles from './styles.module.css'

export function Clientes() {
    const { state } = useClientes();
    const navigate = useNavigate()

    if (state.status === 'idle' || state.status === 'loading') {
        return <p>Cargando clientes</p>
    }
    if (state.status === 'error') {
        return <p>Error: {state.error}</p>
    }
    return (
        <>
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
                    {state.data.data.map(cli => (<CardsCliente key={cli.id_cliente} clientes={cli} />))}
                </tbody>

            </table>

        </>

    )
}