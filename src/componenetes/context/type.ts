import type { Producto } from "../../types/types";


export interface ItemCarrito{
    producto: Producto
    cantidad: number
}

export interface ClienteSeleccionado{
    id_cliente: number,
    nombre: string,
    apellido: string,
    localidad: number,
    direccion?: string,
    celular?: string
}

export interface PedidoContextType{
    cliente: ClienteSeleccionado | undefined;
    carrito: ItemCarrito[];
    seleccionarCliente: (cliente: ClienteSeleccionado | undefined) => void;
    agregarProducto: (producto: Producto) => void;
    restarProducto: (id_producto: number) => void;
    eliminarProducto: (id_producto: number) => void;
    vaciarPedido: () => void;
    totalEstimado: number;
}