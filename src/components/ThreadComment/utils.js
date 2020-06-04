const getEnding = (interval) => (interval > 1 ? "s" : "");

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} year${getEnding(interval)}`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${getEnding(interval)}`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${getEnding(interval)}`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${getEnding(interval)}`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${getEnding(interval)}`;
  }

  return `${Math.floor(seconds)} second${getEnding(interval)}`;
};
