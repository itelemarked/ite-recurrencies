import { throwTypeError } from "./error.util"



export type Integer = number & { _type: 'Integer' }

export type PositiveInteger = number & { _type: 'PositiveInteger' }

export type NegativeInteger = number & { _type: 'NegativeInteger' }



export function toInteger(n: number): Integer {
  if (!Number.isInteger(n)) throwTypeError('Argument should be an Integer', n)
  return n as Integer;
}


export function toPositiveInteger(n: number): PositiveInteger {
  if (!Number.isInteger(n)) throwTypeError('Argument should be an Integer', n)
  if (n <= 0) throwTypeError('Argument should be greater than 0', n)
  return n as PositiveInteger;
}


export function toNegativeInteger(n: number): NegativeInteger {
  if (!Number.isInteger(n)) throwTypeError('Argument should be an Integer', n)
  if (n >= 0) throwTypeError('Argument should be greater than 0', n)
  return n as NegativeInteger;
}

