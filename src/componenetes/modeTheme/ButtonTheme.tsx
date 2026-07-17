import type { Theme } from "./ThemeMode";
import styles from '../../page/clientes/styles.module.css'
interface props{
    theme : Theme;
    onCambiarTheme : () => void;

}

export function ButtonTheme({theme, onCambiarTheme}:props){
    const isTheme = theme === 'dark';

    return(
        <button className={styles.btn_cliente} onClick={onCambiarTheme}>
            {isTheme ? '🌞' : '🌙' }
        </button>
    )
}