export const convertDate = (string: string) => {
  const date = new Date(Date.parse(string));
  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return month[date.getMonth()] + ' ' + date.getDay() + ', ' + date.getFullYear();
}
