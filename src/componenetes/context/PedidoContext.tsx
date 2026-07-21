import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { ItemCarrito, PedidoContextType} from "./type";
import type { Cliente, Producto } from "../../types/types";
import { Modal } from "../modal/Modal";


interface Props {
    children: ReactNode;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function PedidoProvider({ children }: Props) {
    const [cliente, setCliente] = useState<Cliente| undefined>(undefined);
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
    const [mensaje, setMensaje] = useState('');

    const seleccionarCliente = (cli: Cliente | undefined) => {
        setCliente(cli);
        setMensaje(`Cliente seleccionado ${cli?.nombre} ${cli?.apellido}`)
    };

    const borrarMensaje=()=>{
        setMensaje('')
    }

    const vaciarCliente = () =>{
        setCliente(undefined)
    }

    const agregarProducto = (producto: Producto) => {

        setCarrito((carritoActual) => {
            const existProducto = carritoActual.find(item => item.producto.id_producto === producto.id_producto)
            if (existProducto) {
                if (existProducto.cantidad >= producto.stock) {
                    setMensaje(`¡Atencion! ..  No hay mas productos de ${producto.nombre}`)
                    return carritoActual;
                }
                return carritoActual.map(item => item.producto.id_producto === producto.id_producto
                    ? { ...item, cantidad: item.cantidad + 1 } : item)
            }
            if (producto.stock <= 0) {
                setMensaje(`El producto ${producto.nombre} no tiene stock disponible.`);
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
        <PedidoContext.Provider value={{cliente,carrito,mensaje,vaciarCliente,borrarMensaje,seleccionarCliente,agregarProducto,eliminarProducto,restarProducto,vaciarPedido,totalEstimado}}>
            {children}
            <Modal isOpen={!!mensaje} onClose={borrarMensaje}>
                <p>{mensaje}</p>
            </Modal>
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