import type { Cliente } from "../../types/types";
import { usePedidoContext } from "../../componenetes/context/PedidoContext";


interface props {
    clientes: Cliente
}


export function CardsCliente({ clientes }: props) {
    const {seleccionarCliente} = usePedidoContext();


    return (


        <tr>
            <td >{clientes.nombre}</td>
            <td>{clientes.apellido}</td>
            <td>{clientes.localidad?.nombre}</td>
            <td>{clientes.direccion}</td>
            <td>{clientes.celular}</td>
            <td><button onClick={()=> seleccionarCliente(clientes)}> + </button></td>
        </tr>


    )
}