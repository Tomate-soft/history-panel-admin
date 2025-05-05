import jsPDF from 'jspdf';
// import { StylesConfigsInterface } from '../types/stylesConfig.types';
// import { DataReceiver, PrinterProps, State } from '../types/printer.d.types';
import { centrarTexto } from './centerText';
import type { StylesConfigsInterface } from './types/stylesConfig';
import type { DataReceiver, PrinterProps, State } from './types/printer.types';

export const printer = ({ name, state }: PrinterProps, doc: jsPDF) => ({
  printTable: () => {
    doc.autoTable(state);
  },

  printTitle: () => {
    centrarTexto({
      doc,
      text: name,
      y: state.startY - 6,
      headerStyles: { fontSize: 10, textColor: [255, 0, 0] },
    });
    doc.line(10, state.startY - 3, 200, state.startY - 3);
  },
});

export const printerReportModel = (
  name: string,
  data: DataReceiver,
  config: StylesConfigsInterface,
  doc: jsPDF,
) => {
  const state: State = {
    head: data.head,
    body: data.body,
    startY: data.startY,
    styles: config.styles,
    headStyles: config.headStyles,
    bodyStyles: config.bodyStyles,
    alternateRowStyles: config.alternateRowStyles,
    columnStyles: config.columnStyles,
  };

  return Object.assign({}, state, printer({ name, state }, doc));
};
