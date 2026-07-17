import type { Cliente } from "../../types/types";


interface props {
    clientes: Cliente
}


export function CardsCliente({ clientes }: props) {

    return (


        <tr>
            <td >{clientes.nombre}</td>
            <td>{clientes.apellido}</td>
            <td>{clientes.localidad?.nombre}</td>
            <td>{clientes.direccion}</td>
            <td>{clientes.celular}</td>

        </tr>


    )
}