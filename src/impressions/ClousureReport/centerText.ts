import type { centerTextProps } from "./types/reports.types";

export const centrarTexto = ({
  doc,
  text,
  y,
  headerStyles,
}: centerTextProps) => {
  const pageWidth = doc.internal.pageSize.width;
  const textWidth = doc.getTextWidth(text);
  const x = (pageWidth - textWidth) / 2;
  doc.text(text, x, y, headerStyles);
};
