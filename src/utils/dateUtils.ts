const TIME_UNITS = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
} as const;

export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < TIME_UNITS.minute) {
    return 'just now';
  }

  for (const [unit, seconds] of Object.entries(TIME_UNITS)) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      const shortUnit = unit === 'month' ? 'mo' : unit[0];
      return `${value}${shortUnit} ago`;
    }
  }

  return 'just now';
}

export function formatDateTime(date: Date): string {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function getRemainingTime(endDate: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((endDate.getTime() - now.getTime()) / 1000);

  if (diffInSeconds <= 0) {
    return 'Expired';
  }

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}