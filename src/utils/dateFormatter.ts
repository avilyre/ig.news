export function dateFormatter(date: string): string {
  const dateConverted = new Date(date);
  const dateFormatted = dateConverted
  .toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  })

  return dateFormatted;
}
