import { throwTypeError } from "./error.util"



export type Integer = number & { _type: 'Integer' }

export function isInteger(n: number): n is Integer {
  return _isInteger(n);
}

export function toInteger(n: number): Integer {
  if (!_isInteger(n)) throwTypeError('Argument should be an Integer', n)
  return n as Integer;
}



export type PositiveInteger = number & { _type: 'PositiveInteger' }

export function isPositiveInteger(n: number): n is PositiveInteger {
  if (!_isInteger(n) || !_isPositive(n)) return false
  return true;
}

export function toPositiveInteger(n: number): PositiveInteger {
  if (!_isInteger(n)) throwTypeError('Should be an Integer', n)
  if (!_isPositive(n)) throwTypeError('Should be positive', n)
  return n as PositiveInteger;
}


export type NegativeInteger = number & { _type: 'NegativeInteger' }

export function isNegativeInteger(n: number): n is NegativeInteger {
  if (!_isInteger(n) || !_isNegative(n)) return false
  return true;
}

export function toNegativeInteger(n: number): NegativeInteger {
  if (!_isInteger(n)) throwTypeError('Should be an Integer', n)
  if (!_isNegative(n)) throwTypeError('Should be negative', n)
  return n as NegativeInteger;
}


// Helper functions

function _isInteger(n: number): boolean {
  return Number.isInteger(n) ? true : false;
}

function _isPositive(n: number): boolean {
  return n > 0 ? true : false;
}

function _isNegative(n: number): boolean {
  return n < 0 ? true : false;
}

