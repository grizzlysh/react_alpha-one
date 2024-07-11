
export const decimal2point = (digit: number) => {

  return (Math.round(digit * 100) / 100);
}