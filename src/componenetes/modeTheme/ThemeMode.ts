import { useEffect, useState } from "react"
export type Theme = 'dark' | 'light';

function getTheme() {
    return window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
}
export function ThemeMode() {
    const [theme, setTheme] = useState<Theme>(getTheme());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme])

    const cambiarTheme = () => {
        setTheme((prev: Theme) => prev === 'dark' ? 'light' : 'dark')
    }
    return { theme, cambiarTheme }
}