// Definimos las interfaces que describen los tipos de las propiedades del objeto
interface Styles {
  fontSize: number; // tamaño de la fuente
  cellPadding: number; // espaciado dentro de las celdas
  cellWidth: 'auto' | number; // ancho de la celda, puede ser 'auto' o un número
  valign: 'top' | 'middle' | 'bottom'; // alineación vertical de las celdas
  halign: 'left' | 'center' | 'right'; // alineación horizontal de las celdas
  lineColor: [number, number, number]; // color del borde en formato RGB
}

interface HeadStyles {
  fillColor: [number, number, number]; // color de fondo del encabezado en RGB
  textColor: [number, number, number]; // color del texto del encabezado en RGB
  fontStyle: 'normal' | 'bold' | 'italic'; // estilo de fuente
}

interface BodyStyles {
  fillColor: [number, number, number]; // color de fondo del cuerpo en RGB
}

interface AlternateRowStyles {
  fillColor: [number, number, number]; // color de fondo para filas alternas en RGB
}

interface ColumnStyles {
  fillColor: [number, number, number]; // color de fondo de la columna en RGB
  borderWidth: number; // ancho del borde de la columna
}

// Definimos la interfaz principal que engloba todas las configuraciones
export interface StylesConfigsInterface {
  styles: Styles;
  headStyles: HeadStyles;
  bodyStyles: BodyStyles;
  alternateRowStyles: AlternateRowStyles;
  columnStyles: ColumnStyles;
}
