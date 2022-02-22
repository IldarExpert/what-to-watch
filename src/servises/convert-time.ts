export const ConvertTime = (time: number): string => {
  const hour = Math.floor(time/60);
  const minutes = time % 60;
  return `${hour}h ${minutes}m`
}
