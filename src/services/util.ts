export function getDateString(dateString: string): string {
  const originalDate = new Date(dateString);
  const origUts = Date.UTC(
    originalDate.getFullYear(),
    originalDate.getMonth(),
    originalDate.getDate(),
  );

  const now = new Date();
  const nowUts = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  );

  const diff = Math.abs(origUts - nowUts);

  const diffSeconds = diff / 1000;
  const diffMinutes = diffSeconds / 60;
  const diffHours = diffMinutes / 60;
  const diffDays = diffHours / 24;

  if (diffDays > 1) {
    return (
      ('0' + originalDate.getDate()).slice(-2) +
      '.' +
      ('0' + (originalDate.getMonth() + 1)).slice(-2) +
      '.' +
      originalDate.getFullYear()
    );
  }

  if (diffSeconds < 60) {
    console.log('secondes ' + diffSeconds);
    return `${Math.floor(diffSeconds)}s`;
  } else if (diffMinutes < 60) {
    console.log('minutes: ' + diffMinutes);
    return `${Math.floor(diffMinutes)}min`;
  } else {
    console.log('hours: ');
    return `${Math.floor(diffHours)}h`;
  }
}
