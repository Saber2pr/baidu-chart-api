export const verify = (n: string) => {
  if (n.includes(".")) throw new TypeError();

  const num = Number(n);

  if (Number.isNaN(num)) throw new TypeError();

  if (num < 1) throw new TypeError();
};

export const getID = () => 10000 + Math.round(10000 * Math.random());

export const calc = (express: string): number => {
  try {
    return Number(eval(express));
  } catch (error) {
    throw error;
  }
};

export const RegTime = /([\d]{4}(-|\/)[\d]{2}(-|\/)[\d]{2}){1}/;

export const getDate = (dateStr: string) => RegTime.exec(dateStr)[0];
