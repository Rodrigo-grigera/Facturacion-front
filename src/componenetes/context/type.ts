import type { Cliente, Producto } from "../../types/types";


export interface ItemCarrito{
    producto: Producto
    cantidad: number
}


export interface PedidoContextType{
    cliente: Cliente | undefined;
    carrito: ItemCarrito[];
    mensaje: string;
    vaciarCliente: () => void; 
    borrarMensaje: () => void;
    seleccionarCliente: (cliente: Cliente | undefined) => void;
    agregarProducto: (producto: Producto) => void;
    restarProducto: (id_producto: number) => void;
    eliminarProducto: (id_producto: number) => void;
    vaciarPedido: () => void;
    totalEstimado: number;
}