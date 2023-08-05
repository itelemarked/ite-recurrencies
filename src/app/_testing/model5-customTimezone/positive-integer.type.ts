
export type PositiveInteger = number & { _type: 'PositiveInteger' }


export function toPositiveInteger(n: number): PositiveInteger {
  if (!Number.isInteger(n)) throw new Error(`toPositiveInteger(), invalid argument. Should be an integer. Evaluating ${n}`)
  if (n <= 0) throw new Error(`toPositiveInteger(), invalid argument. Should be greater than 0. Evaluating ${n}`)
  return n as PositiveInteger;
}
