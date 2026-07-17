import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { ClienteSeleccionado, ItemCarrito, PedidoContextType} from "./type";
import type { Producto } from "../../types/types";


interface Props {
    children: ReactNode;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function PedidoProvider({ children }: Props) {
    const [cliente, setCliente] = useState<ClienteSeleccionado | undefined>(undefined);
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

    const seleccionarCliente = (cli: ClienteSeleccionado | undefined) => {
        setCliente(cli);
    };

    const agregarProducto = (producto: Producto) => {

        setCarrito((carritoActual) => {
            const existProducto = carritoActual.find(item => item.producto.id_producto === producto.id_producto)
            if (existProducto) {
                if (existProducto.cantidad >= producto.stock) {
                    alert(`¡Atencion! ..  No hay mas productos de ${producto.nombre}`)
                    return carritoActual;
                }
                return carritoActual.map(item => item.producto.id_producto === producto.id_producto
                    ? { ...item, cantidad: item.cantidad + 1 } : item)
            }
            if (producto.stock <= 0) {
                alert(`El producto ${producto.nombre} no tiene stock disponible.`);
                return carritoActual; 
            }

            return [...carritoActual, { producto, cantidad: 1 }];

        })
    }
    
    const restarProducto = (id_producto : number) =>{
        setCarrito((prev) => 
            prev.map((item)=> {
                if(item.producto.id_producto === id_producto){
                    return {...item, cantidad: item.cantidad > 1 ? item.cantidad -1 : 1}
                }
                return item
            }))
    }

    const  eliminarProducto = (id_producto : number) =>{
        setCarrito((prev) => prev.filter((item) => item.producto.id_producto !== id_producto))
    }

    const vaciarPedido = () => {
        setCliente(undefined);
        setCarrito([]);
    };

    const totalEstimado = carrito.reduce((acc, item) => acc + (Number(item.producto.precio)* item.cantidad),0)
    return (
        <PedidoContext.Provider value={{cliente,carrito,seleccionarCliente,agregarProducto,eliminarProducto,restarProducto,vaciarPedido,totalEstimado}}>
            {children}
        </PedidoContext.Provider>
    )
}

export function usePedidoContext() {
    const context = useContext(PedidoContext);
    if (!context) {
        throw new Error('usePedidoContext debe ser utilizado dentro de un PedidoProvider');
    }
    return context;
}