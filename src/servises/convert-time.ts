export const convertTime = (time: number): string => {
  if (time < 0) return '0h 0m';
  const hour = Math.floor(time/60);
  const minutes = time % 60;
  return `${hour}h ${minutes}m`
}
