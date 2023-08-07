
export type TimezoneIso = string & { _type: 'TimezoneIso' }


const REGEX = /^\d{4}-\d{2}-\d{2}T([0-1][0-9]|2[0-3]):([0-5][0-9]):[0-5][0-9][+-](((0[0-9]|1[0-1]):[0-5][0-9])|(12:00))$/


export function isTimezoneIso(s: string): s is TimezoneIso {
  const matchRegex = s.match(REGEX) !== null;
  const isValidDate = new Date(s).toString() !== 'Invalid Date'
  return matchRegex && isValidDate
}


export function toTimezoneIso(s: string): TimezoneIso {
  if (!isTimezoneIso(s)) throw new Error(`toTimezoneIso(): invalid argument. Evaluating ${s}`)
  return s;
}
