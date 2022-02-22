export const convertKeyObj = (obj: any): any => {
  return Object.fromEntries(Object.entries(obj)
    .map((key) => {
      return [key[0]
        .split('_')
        .map((el, index) => {
          if (index === 0) return el
          return (el[0].toUpperCase() + el.slice(1));
        })
        .join(''),
        key[1]];
    }))
}

export const convertKeyArr = (arr: any[]): any[] => {
  return arr.map((el) => convertKeyObj(el));
}
