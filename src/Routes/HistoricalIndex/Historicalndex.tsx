import React from 'react'; // Importa React si usas JSX
import { SignedIn, UserButton } from '@clerk/astro/react';
import styles from './HistoricalIndex.module.css';



const HistoricalIndex = () => {
  return (
      <div className={styles.container}>
        <header>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <h1>Historical Index desde React</h1>
        <h1>
          Acá empezamos con las tablas
          <p>acá irá la tabla de contenido</p>
        </h1>
        <h2>Al parecer todo funciona perfecto</h2>
      </div>
  );
};

export default HistoricalIndex;