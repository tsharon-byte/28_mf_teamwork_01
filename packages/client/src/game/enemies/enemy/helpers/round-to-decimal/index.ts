const roundToDecimal = (n: number, d: number) =>
  Math.round(n * d * 10) / (d * 10)

export default roundToDecimal
