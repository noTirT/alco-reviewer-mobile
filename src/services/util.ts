export function getDateString(dateString: string) {
  const originalDate = new Date(dateString);
  return (
    ('0' + originalDate.getDate()).slice(-2) +
    '.' +
    ('0' + (originalDate.getMonth() + 1)).slice(-2) +
    '.' +
    originalDate.getFullYear()
  );
}
