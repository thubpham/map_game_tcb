export const calculateTimeLeft = (expiresAt?: string): string | null => {
  if (!expiresAt) {
    return null;
  }

  const expirationDate = new Date(expiresAt);
  const now = new Date();
  const timeLeftMs = expirationDate.getTime() - now.getTime();

  if (timeLeftMs <= 0) {
    return 'Expired';
  }

  const seconds = Math.floor(timeLeftMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} left`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} left`;
  }
};
