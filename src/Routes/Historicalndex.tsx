import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/astro/react'

export const HistoricalIndex = () => {
    return (
        <div>
            <SignedIn>
                <UserButton showName/>
            </SignedIn>
            <h1>Historical Index desde react</h1>
            <h1>Aca empezamos con las tablas
            <p>aca ira la tabla de contenido</p></h1>
            <h2>Al parecer todo funciona perfecto</h2>
        </div>
    )
}