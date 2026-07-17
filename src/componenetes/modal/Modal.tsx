import type { ReactNode } from "react";
import styles from './styles.module.css';

interface Props {
    isOpen: boolean
    children: ReactNode
    onClose: () => void
}

export function Modal({ children, onClose, isOpen }: Props) {

    if (!isOpen) return null;

    return (
        <>
            <article className={styles.art_modal}>
                <div className={styles.div_modal}>
                    <button onClick={onClose} className={styles.btn_close}> X </button>
                    {children}
                </div>
            </article>
        </>
    )
}