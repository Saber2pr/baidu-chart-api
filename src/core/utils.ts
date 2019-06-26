export const verify = (n: string) => {
  if (n.includes('.')) throw new TypeError()

  const num = Number(n)

  if (Number.isNaN(num)) throw new TypeError()

  if (num < 1) throw new TypeError()
}

export const getID = () => 10000 + Math.round(10000 * Math.random())
