
import { useState } from "react";
import { Modal } from "../../componenetes/modal/Modal";
import { Cards_Producto } from "./Cards_Producto"
import { useProducts } from "./hooks/useProducts"
import './styles.css'
import { useNavigate } from "react-router-dom";
import styles from '../clientes/styles.module.css'

export function MisProductos() {
    const { state } = useProducts();
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()

    if (state.status === 'idle' || state.status === 'loading') {
        return <p>Cargando productos..</p>
    }

    return (
        <main>
            <article>
                {state.status === 'error' && (
                    <Modal isOpen={open} onClose={() => setOpen(false)}>
                        <p>{state.error}</p>
                    </Modal>
                )}
            </article>
            
            <header className={styles.cont_title}>
                <h2>Mis productos</h2>
                <button onClick={() => navigate('/crearProducto')} className={styles.btn_cliente}>Crear Producto</button>
            </header>

            <section className="cont-prod">
                {state.status === 'success' ? (
                    state.data.data.map((pro) => (
                        <Cards_Producto key={pro.id_producto} producto={pro} />))) : (

                    <div className="error-placeholder">
                        <p>No se pudieron cargar los productos: {state.error}</p>
                    </div>
                )}
            </section>

        </main>

    )
}