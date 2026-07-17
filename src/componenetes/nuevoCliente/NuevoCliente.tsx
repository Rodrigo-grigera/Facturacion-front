import { useState, type FormEvent } from "react"
import styles from '../agregarProduco/style.module.css';
import { crearCliente } from "../../service/Service";
import type { CrearCliente } from "../../types/types";
import { Modal } from "../modal/Modal";
    
export function NuevoCliente() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [localidadId, setLocalidad] = useState<number | undefined>();
    const [direccion, setDireccion] = useState('');
    const [celular, setCelular] = useState('');

    const [modalTitle, setModalTitle] = useState('');
    const [message, setMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const datos: CrearCliente = { nombre, apellido, localidadId, direccion, celular }
        console.log(datos);
        try {
            const resp = await crearCliente(datos)
            console.log(resp)
            setModalTitle('Exito');
            setMessage(resp.message);
            setModalOpen(true);
            

            setNombre('')
            setApellido('')
            setCelular('')
            setDireccion('')
            setLocalidad(undefined)

        } catch (error) {
            if (error instanceof Error) {
                setModalTitle('Error');
                setMessage(error.message)
                setModalOpen(true)
            }
        }

    }

    return (
        <>
            <header><h1>Nuevo Cliente</h1></header>

            < Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>{modalTitle}</h2>
                <p>{message}</p>
            </Modal>

            <section>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <label>Nombre</label>
                    <input type="text" placeholder="Ingresar Nombre..." value={nombre} onChange={(e) => setNombre(e.target.value)} />

                    <label>Apellido</label>
                    <input type="text" placeholder="Ingresar Apellido..." value={apellido} onChange={(e) => setApellido(e.target.value)} />

                    <label>Localidad</label>
                    <select
                        value={localidadId} onChange={(e) => setLocalidad(Number(e.target.value))}>
                        <option>...</option>
                        <option value={1}>Ayacucho</option>
                    </select>

                    <label>Dirección</label>
                    <input type="text" placeholder="Ingresar Direccion..." value={direccion} onChange={(e) => setDireccion(e.target.value)} />

                    <label>Celular</label>
                    <input type="text" placeholder="Ingresar celular..." value={celular} onChange={(e) => setCelular(e.target.value)} />

                    <button type="submit">Guardar Cliente</button>
                </form>
            </section>
        </>
    )
}