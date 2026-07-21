
import type { Producto } from "../../types/types"
import './styles.css'
import { usePedidoContext } from "../../componenetes/context/PedidoContext"
import { useState } from "react";


interface props{
    producto: Producto
}


export function Cards_Producto({ producto }: props) {
    const{agregarProducto, carrito} = usePedidoContext();
    const [msj, setMsj] = useState('')

    const msjProductoAgregado =()=>{
        setMsj('Producto agregado')
        setTimeout(()=>{
            setMsj('')
        },1000)
    }

    const itemEnCarrito = carrito.find(item => item.producto.id_producto === producto.id_producto)
    const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
    const stockDisponible = producto.stock - cantidadEnCarrito;

    return (
        <article className="card-cont">
            <strong>{producto.nombre}</strong>
            <p>Marca: {producto.marca}</p>
            <p>Precio: {producto.precio} $</p>
            <p>Stock: {stockDisponible}</p>
            {msj &&(
                <p style={{color: '#20f120'}}>{msj}</p>
            )}
            <button onClick={()=> (agregarProducto(producto), msjProductoAgregado())}
                disabled={producto.stock <= 0}>{producto.stock <= 0 ? 'Sin stock' : 'Agregar'}</button>
        </article>
    )
}