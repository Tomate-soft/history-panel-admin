import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { type centerTextProps, headerStyle } from './types/reports.types'
import logo from '../../assets/tomateLogo.png';
import {
  CANCELLATIONS_POSITION,
  COURTESIES_POSITION,
  DISCOUNTS_POSITION,
  PARALLEVAR_TRANSACTIONS_POSITION,
  PAYMENTS_TABLE_POSITION,
  RAPPI_TRANSACTIONS_POSITION,
  RESTAURANT_TRANSACTIONS_POSITION,
  SELLTYPES_TABLE_POSITION,
  stylesConfigs,
  TELEFONICO_TRANSACTIONS_POSITION
} from './consts';

import { printerReportModel } from './printer';
import { centrarTexto } from './centerText';
import { formatToCurrency } from '../../helpers/formatToCurrency';
import type { PngOptions } from 'sharp';

function formatQuantity(quantity: string) {
  return parseFloat(quantity).toFixed(2)
}

// Función para generar el reporte de ventas
export const generateOperatingPeriodReport = (period: any) => {
  if (!period) return
  const closing = period.operationalClousure
  console.log(closing)
  const doc = new jsPDF()
  doc.setFontSize(10)

  const BUSSINES_NAME = 'TAQUERIAS MG SA DE CV'
  const REPORT_NAME = 'REPORTE DE CIERRE OPERATIVO'
  const BRANCH_NAME = 'SUCURSAL CHAPULTEPEC'
  const TRANSACTIONS_RESUME_TITLE = 'RESUMEN DE TRANSACCIONES'
  const PERIOD_DATE = `PERIODO DE OPERACION ${new Date(period.createdAt)
    .toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    .toUpperCase()}`

  const headerData: centerTextProps[] = [
    { doc, text: BUSSINES_NAME, y: 16, headerStyles: headerStyle },
    { doc, text: REPORT_NAME, y: 22, headerStyles: headerStyle },
    { doc, text: PERIOD_DATE, y: 28, headerStyles: headerStyle },
    { doc, text: BRANCH_NAME, y: 34, headerStyles: headerStyle }
  ]

  // Agregar logo y encabezados
  doc.addImage(logo as unknown as string, 'PNG', 10, 15, 36, 12)
  headerData.forEach((header) => centrarTexto(header))
  doc.line(10, 48, 200, 48)
  doc.text('RESUMEN DE VENTAS', 10, 56)
  doc.text(`$${formatToCurrency(closing.totalSellsAmount)}`, 10, 64)

  doc.text('Total de ingresos: $000,000,000', 140, 64)
  doc.text('Total de egresos : $000,000,000', 140, 70)
  doc.text('Total de retornos: $000,000,000', 140, 76)

  const sellTypeReport = printerReportModel(
    'Ventas por tipo de venta',
    {
      startY: SELLTYPES_TABLE_POSITION,
      body: [
        ['Restaurante', `$${formatToCurrency(closing.totalRestaurantAmount)}`],
        ['Para llevar', `$${formatToCurrency(closing.totalToGoOrdersAmount)}`],
        ['Telefonico', `$${formatToCurrency(closing.totalPhoneAmount)}`],
        ['Rappi', `$${formatToCurrency(closing.totalRappiAmount)}`]
      ],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  const paymentsReport = printerReportModel(
    'Ventas por metodo de pago',
    {
      startY: PAYMENTS_TABLE_POSITION,
      body: [
        ['Efectivo', `$${formatToCurrency(closing.totalCashInAmount)}`],
        ['Tarjeta de débito', `$${formatToCurrency(closing.totalDebitAmount)}`],
        ['Tarjeta de crédito', `$${formatToCurrency(closing.totalCreditAmount)}`],
        ['Tranferencia bancaria', `$${formatToCurrency(closing.totalTransferAmount)}`]
      ],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  const resumeTransactionsTable = printerReportModel(
    'Resumen de transacciones',
    {
      startY: RESTAURANT_TRANSACTIONS_POSITION,
      body: [
        ['Numero de comensales', closing.totalDiners],
        ['Mesas atendidas', closing.finishedAccounts]
      ],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  const toGoTable = printerReportModel(
    'Ventas para llevar',
    {
      startY: PARALLEVAR_TRANSACTIONS_POSITION,
      body: [['Cuentas abiertas', closing.togoOrdersTotal]],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  const phoneTable = printerReportModel(
    'Ventas de pedidos telefonicos',
    {
      startY: TELEFONICO_TRANSACTIONS_POSITION,
      body: [['Cuentas abiertas', closing.phoneOrdersTotal]],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  const rappiTable = printerReportModel(
    'Ventas de pedidos de rappi',
    {
      startY: RAPPI_TRANSACTIONS_POSITION,
      body: [['Cuentas abiertas', closing.rappiOrdersTotal]],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  const discountsTable = printerReportModel(
    'Descuentos',
    {
      startY: DISCOUNTS_POSITION,
      body: [
        ['Descuentos aplicados', closing.numberOfDiscounts],
        ['Monto total de descuentos', `$${formatToCurrency(closing.discountTotalAmount)}`]
      ],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  const courtesiesTable = printerReportModel(
    'Cortesías',
    {
      startY: COURTESIES_POSITION,
      body: [
        ['Cortesías aplicadas', closing.numberOfCourtesy],
        ['Monto total de descuentos', `$${formatToCurrency(closing.courtesyTotalAmount)}`]
      ],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  const cancellationsTable = printerReportModel(
    'Cancelaciones',
    {
      startY: CANCELLATIONS_POSITION,
      body: [
        ['Cancelaciones aplicadas', closing.numberOfCancellations],
        ['Monto total de descuentos', `$${formatToCurrency(closing.cancellationsTotalAmount)}`]
      ],
      head: [['Tipo', 'Cantidad']]
    },
    stylesConfigs,
    doc
  )

  // Payments table
  paymentsReport.printTitle()
  paymentsReport.printTable()
  // Sell types table
  sellTypeReport.printTitle()
  sellTypeReport.printTable()

  resumeTransactionsTable.printTitle()
  resumeTransactionsTable.printTable()

  doc.addPage() // New Page

  // To go table
  toGoTable.printTitle()
  toGoTable.printTable()
  // Phone table
  phoneTable.printTitle()
  phoneTable.printTable()
  // rappi
  rappiTable.printTitle()
  rappiTable.printTable()
  // descuentos
  discountsTable.printTitle()
  discountsTable.printTable()

  //cortesías
  courtesiesTable.printTitle()
  courtesiesTable.printTable()
  // cancelaciones
  cancellationsTable.printTitle()
  cancellationsTable.printTable()
  // agregaremos las ventas por caja
  //  doc.addPage(); // New Page
  //doc.text(TILL_SELLS_TITLE, 20, 25);

  centrarTexto({ doc, text: 'Nombre y firma.', y: 280, headerStyles: headerStyle })
  centrarTexto({
    doc,
    text: '___________________________________________________',
    y: 274,
    headerStyles: headerStyle
  })

  doc.save('reporte_ventas.pdf')
}
