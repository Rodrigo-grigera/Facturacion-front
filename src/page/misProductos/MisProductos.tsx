
import { Cards_Producto } from "./Cards_Producto"
import { useProducts } from "./hooks/useProducts"
import './styles.css'
export function MisProductos() {
    const { state } = useProducts();

    if (state.status === 'idle' || state.status === 'loading') {
        return <p>Cargando productos..</p>
    }
    if (state.status === 'error') {
        return <p>{state.error}</p>
    }
    return (
        <>

            <h2>Mis productos</h2>
            <section className="cont-prod">
                {state.data.data.map((pro) => (<Cards_Producto key={pro.id_producto} producto={pro} />))}
            </section>

        </>

    )
}