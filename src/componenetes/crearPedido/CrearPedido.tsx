import { enviarPedidoBack } from "../../service/Service";
import { usePedidoContext } from "../context/PedidoContext";
import styles from './style.module.css';

export function CrearPedidoFrom() {
    const { cliente, carrito, agregarProducto, eliminarProducto,
        restarProducto, vaciarPedido, vaciarCliente, totalEstimado } = usePedidoContext();

    const handleSubmitPedido = async () => {
        if (!cliente) {
            alert("Error: Primero debes seleccionar un cliente de la lista.");
            return;
        }
        if (carrito.length === 0) {
            alert("Error: El pedido no tiene productos agregados.");
            return;
        }
        const pedido = {
            clienteId: cliente.id_cliente,
            detalles: carrito.map((item) => ({
                productoId: item.producto.id_producto,
                cantidad: item.cantidad
            }))
        }
        try {
            const resp = await enviarPedidoBack(pedido)
            if (!resp) {
                throw new Error('Error al crear el pedido')
            }
            alert("¡Pedido creado con éxito!");
            vaciarPedido();
        } catch (error) {
            alert('Hubo un problema al crear el pedido')
        }
    }
    return (
        <>
            <section className={styles.cont_pedido}>
                <h3>Resumen del Pedido</h3>

                {/* Datos del cliente asignado */}
                    <div className={styles.div_destina}>
                        <strong>Destinatario:</strong> {cliente ? `${cliente.nombre} ${cliente.apellido}` : <span style={{ color: 'red' }}>Ninguno seleccionado</span>}
                        <button onClick={() => vaciarCliente()}>x</button>
                    </div>
              

                {/* Listado de productos acumulados */}
                {carrito.length === 0 ? (
                    <p style={{ color: 'gray' }}>Haz clic en "Agregar" en las tarjetas de productos para armar el pedido.</p>
                ) : (
                    <div className={styles.cont_table}>
                        <table>
                            <thead>
                                <tr style={{ textAlign: 'left' }}>
                                    <th>Producto</th>
                                    <th>Marca/descripción</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {carrito.map(item => (
                                    <tr key={item.producto.id_producto}>
                                        <td>{item.producto.nombre}</td>
                                        <td>{item.producto.marca}</td>
                                        <td>${item.producto.precio}</td>
                                        <td>{item.cantidad}</td>
                                        <td>${(Number(item.producto.precio) * item.cantidad).toFixed(2)}</td>
                                        <td>
                                            {/* Botones conectados al contexto global */}
                                            <button onClick={() => restarProducto(item.producto.id_producto)}>-</button>
                                            <button onClick={() => agregarProducto(item.producto)}> + </button>
                                            <button
                                                onClick={() => eliminarProducto(item.producto.id_producto)}
                                                style={{ marginLeft: '10px', color: 'red' }}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '30px' }}>
                            Total: ${totalEstimado?.toFixed(2)}
                        </div>

                        <button className={styles.btn_confirm}
                            onClick={handleSubmitPedido}>
                            Confirmar Pedido
                        </button>
                    </div>
                )}
            </section>

        </>
    )
}