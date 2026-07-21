import type { Cliente, CrearCliente, Pedido, Prod, Producto, respCreate, response } from "../types/types";

const URL_base = 'http://localhost:3000'

export async function ClientesFetch(controller: AbortController): Promise<response<Cliente>> {
    const resp = await fetch(`${URL_base}/clientes`, { signal: controller.signal });
    if (!resp.ok) {
        throw new Error('No se encontraron clientes')
    }
    const data = await resp.json()
    return data;
}


export async function ProductosFetch(controller: AbortController): Promise<response<Producto>> {
    const resp = await fetch(`${URL_base}/productos`, { signal: controller.signal });
    if (!resp.ok) {
        throw new Error('No se encontraron productos')
    }
    const data = await resp.json()
    return data
}


export async function crearProducto(datos: Prod): Promise<respCreate> {
    const resp = await fetch(`${URL_base}/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    if (!resp.ok) throw new Error('Error al crear el produto')

    const data = await resp.json()
    return {
        code: data.code,
        message: data.message
    }

}

export async function crearCliente(datos: CrearCliente): Promise<respCreate> {
    const resp = await fetch(`${URL_base}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })

    if (!resp.ok) throw new Error('Error al crear el cliente')
    const data: respCreate = await resp.json()
    return {
        code: data.code,
        message: data.message
    }
}

export async function enviarPedidoBack(pedido: Pedido): Promise<Pedido> {
    const resp = await fetch(`${URL_base}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
    })
    if(!resp.ok) throw new Error('No se pudo crear el pedido')
    
    const data = await resp.json();
    return data
}
