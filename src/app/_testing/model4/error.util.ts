
export function throwTypeError(msg: string, val: unknown): never {
  const prefix = 'Custom type error'

  throw new Error(`### Custom type error: ${msg}. Evaluating: ${val}. ###`)
}
