import { SignedIn, UserButton } from '@clerk/astro/react'
import styles from './HistoricalIndex.module.css'

import {
    FluentProvider,
    webLightTheme,
    Button
} from "@fluentui/react-components";

export const HistoricalIndex = () => {
    return (
        <FluentProvider theme={webLightTheme}>
            <div className={styles.container}>
                <header>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </header>
                <h1>Historical Index desde react</h1>
                <h1>Aca empezamos con las tablas
                <p>aca ira la tabla de contenido</p></h1>
                <h2>Al parecer todo funciona perfecto</h2>
                <Button>Button</Button>
            </div>
        </FluentProvider>
    )
}

export default HistoricalIndex
