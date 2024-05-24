export const formatDateString = (dateStr: string): string => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const formattedDateString = `${year}/${day}/${month}`;

  return formattedDateString;
}