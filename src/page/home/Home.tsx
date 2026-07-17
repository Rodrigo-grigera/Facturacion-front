import { Outlet } from "react-router-dom";
import { RenderAside } from "./RenderAside";
import styles from './styles.module.css';
import { ButtonTheme } from "../../componenetes/modeTheme/ButtonTheme";
import { ThemeMode } from "../../componenetes/modeTheme/ThemeMode";

export function Home() {
const {theme, cambiarTheme} = ThemeMode() 
    return (
        <>
            <header className={styles.header}>
                <h1>La Fistchetita</h1>
                <ButtonTheme theme={theme} onCambiarTheme={cambiarTheme}/>
            </header>

            <main className={styles.cont_main}>

                <aside className={styles.aside}>
                    <RenderAside />
                </aside>

                <section className={styles.content}>
                    <Outlet />
                </section>
            </main>
        </>

    )
}