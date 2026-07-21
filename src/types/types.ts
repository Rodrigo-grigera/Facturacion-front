
export interface Localidad {
    id_localidad: number,
    nombre: string
}

export interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    celular?: string;
    direccion?: string;
    localidad?: Localidad
}

export interface CrearCliente {
    nombre: string;
    apellido: string;
    celular?: string;
    direccion?: string;
    localidadId?: number;
}

export interface response<T> {
    code: number,
    message: string,
    data: T[]
}

export type FetchState<T> =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success', data: T }
    | { status: 'error', error: string }

export interface Producto {
    id_producto: number;
    nombre: string;
    marca: string
    precio: number;
    stock: number
}

export type Prod = Pick<Producto, 'nombre' | 'marca' | 'precio' | 'stock'>


export interface respCreate {
    code: number,
    message: string
}

export interface DetallePedido{
    productoId: number,
    cantidad: number
}
export interface Pedido{
    clienteId: number,
    detalles: DetallePedido[]
}