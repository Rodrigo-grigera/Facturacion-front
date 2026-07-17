
import type { Producto } from "../../types/types"
import './styles.css'
import { usePedidoContext } from "../../componenetes/context/PedidoContext"


interface props{
    producto: Producto
}


export function Cards_Producto({ producto }: props) {
    const{agregarProducto} = usePedidoContext()

    return (
        <article className="card-cont">
            <strong>{producto.nombre}</strong>
            <p>Marca: {producto.marca}</p>
            <p>Precio: {producto.precio} $</p>
            <p>Stock: {producto.stock}</p>
            <button onClick={()=> agregarProducto(producto)}
                disabled={producto.stock <= 0}>{producto.stock <= 0 ? 'Sin stock' : 'Agregar'}</button>
        </article>
    )
}