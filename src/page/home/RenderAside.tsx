import { NavLink } from "react-router-dom";
import styles from'./styles.module.css';

export function RenderAside(){
    return(
        <nav className={styles.cont_navAside}>
        <NavLink to={'/'}>Mis productos</NavLink>
        <NavLink to={'/clientes'}>Mis Clietnes</NavLink>
        <NavLink to={'/pedido'}>Pedidos</NavLink>
        </nav>
    )
}