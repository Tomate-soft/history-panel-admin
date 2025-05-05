/////////////////////////////
// operatingPeriod report////
/////////////////////////////

import type { StylesConfigsInterface } from "./types/stylesConfig"

export const SELLTYPES_TABLE_POSITION = 120
export const PAYMENTS_TABLE_POSITION = 180
export const RESTAURANT_TRANSACTIONS_POSITION = 240
export const PARALLEVAR_TRANSACTIONS_POSITION = 32
export const TELEFONICO_TRANSACTIONS_POSITION = 64
export const RAPPI_TRANSACTIONS_POSITION = 96
export const DISCOUNTS_POSITION = 128
export const COURTESIES_POSITION = 168
export const CANCELLATIONS_POSITION = 206

export const stylesConfigs: StylesConfigsInterface = {
  styles: {
    fontSize: 10, // Cambia el tamaño de la fuente de la tabla
    cellPadding: 2, // Espacio dentro de las celdas
    cellWidth: 'auto',
    valign: 'middle', // Alineación vertical
    halign: 'left', // Alineación horizontal
    lineColor: [0, 0, 0] // Color del borde de la celda
  },

  // Estilos para el encabezado
  headStyles: {
    fillColor: [153, 0, 15],
    textColor: [255, 255, 255],
    fontStyle: 'bold'
  },

  // Estilos para el cuerpo
  bodyStyles: {
    fillColor: [245, 245, 245]
  },

  // Estilos para filas alternas
  alternateRowStyles: {
    fillColor: [220, 220, 220]
  },

  columnStyles: {
    fillColor: [240, 240, 240],
    borderWidth: 1
  }
}
