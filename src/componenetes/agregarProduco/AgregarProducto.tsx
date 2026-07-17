import { useState, type FormEvent } from "react";
import { crearProducto } from "../../service/Service";
import styles from './style.module.css';

export function AgregarProducto() {
    const [nombre, setNombre] = useState('')
    const [marca, setMarca] = useState('')
    const [stock, setStock] = useState('')
    const [precio, setPrecio] = useState('')
    const [mensaje, setMensaje] = useState('')


       const reset = () =>{
            setMarca('')
            setNombre('')
            setPrecio('')
            setStock('')
        }

    const handleSubmitProduct = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const datos = { nombre, marca, stock: Number(stock), precio: Number(precio) }
           const resp = await crearProducto(datos)
           if(resp.code === 201){
               setMensaje(`${resp.message}`)
           }
           setMensaje(`${resp.code}/ ${resp.message}`)
        } catch (error) {
            return mensaje
        }
            reset()
    }

    return (

        <section >
            {mensaje}
            <form className={styles.formContainer} onSubmit={handleSubmitProduct}>
                <label>Nombre</label>
                <input type='text' value={nombre} onChange={(e) => { setNombre(e.target.value) }} placeholder="Nombre del producto.."/>

                <label>marca</label>
                <input type='text' value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Descripcion..." />

                <label>precio</label>
                <input type='number' value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Agreagar precio..."    />

                <label>stock</label>
                <input type='number' value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Cantidad stock..." />
                <button type='submit'>Crear</button>
            </form>
            
        </section>
    )

}