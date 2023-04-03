/** 천단위 콤마 */
export const toLocaleString = (from: number | string) => {
  return from.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
