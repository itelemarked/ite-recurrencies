

// TODO
// - concatenate REGEX? use reg1.source + reg2.source
// - use a function named ??? to add '^' and '$' with the possibility to concatenate?



export type TimezoneOffset = string & { _type: 'TimezoneOffset' }

// const TIMEZONE_OFFSET_REGEX = /^([+-])(?:(0[0-9]|1[0-1]):([0-5][0-9])|(12):(00))$/
const TIMEZONE_OFFSET_REGEX = /([+-])(?:(0[0-9]|1[0-1]):([0-5][0-9])|(12):(00))/

// export function assertTimezoneOffset(s: string): asserts s is TimezoneOffset {
//   const matchRegex = s.match(TIMEZONE_OFFSET_REGEX) !== null
//   if (!matchRegex) throw new Error(`assertTimezoneOffset(), invalid argument. Doesn't match 'shh:mm' where s: + or -, hh: 00-12, mm: 00-59. Evaluating ${s}`)
// }

export function toTimezoneOffset(s: string): TimezoneOffset {
  const matchRegex = s.match(/^/.source + TIMEZONE_OFFSET_REGEX.source + /$/.source) !== null
  if (!matchRegex) throw new Error(`toTimezoneOffset(), invalid argument. Doesn't match 'shh:mm' where s: + or -, hh: 00-12, mm: 00-59. Evaluating ${s}`)

  return s as TimezoneOffset
}


export type TimezoneDate = string & { _type: 'TimezoneDate' }

// const TIMEZONE_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})$/
const TIMEZONE_DATE_REGEX = /(\d{4})-(\d{2})-(\d{2})/

// export function assertTimezoneDate(s: string): asserts s is TimezoneDate {
//   const matchRegex = s.match(TIMEZONE_DATE_REGEX) !== null;
//   const isValidDate = new Date(s).toString() !== 'Invalid Date';
//   if (!matchRegex || !isValidDate) throw new Error(`assertTimeZoneDate(): invalid argument. Evaluating ${s}`)
// }

export function toTimezoneDate(s: string): TimezoneDate {
  const matchRegex = s.match(TIMEZONE_DATE_REGEX) !== null;
  const isValidDate = new Date(s).toString() !== 'Invalid Date';
  if (!matchRegex || !isValidDate) throw new Error(`toTimeZoneDate(): invalid argument. Evaluating ${s}`)
  return s as TimezoneDate
}


export type TimezoneTime = string & { _type: 'TimezoneTime' }

// const TIMEZONE_TIME_REGEX = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/
const TIMEZONE_TIME_REGEX = /([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/

// export function assertTimezoneTime(s: string): asserts s is TimezoneTime {
//   const matchRegex = s.match(TIMEZONE_TIME_REGEX) !== null
//   if (!matchRegex) throw new Error(`assertTimezoneTime(), invalid argument. Evaluating ${s}`)
// }

export function toTimezoneTime(s: string): TimezoneTime {
  const matchRegex = s.match(TIMEZONE_TIME_REGEX) !== null
  if (!matchRegex) throw new Error(`toTimezoneTime(), invalid argument. Evaluating ${s}`)
  return s as TimezoneTime
}


export type TimezoneISO = string & { _type: 'TimezoneISO' }

// const TIMEZONE_ISO_REGEX = /^\d{4}-\d{2}-\d{2}T([0-1][0-9]|2[0-3]):([0-5][0-9]):[0-5][0-9][+-](((0[0-9]|1[0-1]):[0-5][0-9])|(12:00))$/
const TIMEZONE_ISO_REGEX = TIMEZONE_DATE_REGEX.source + /T/.source + TIMEZONE_TIME_REGEX.source + TIMEZONE_OFFSET_REGEX.source

// export function assertTimezoneISO(s: string): asserts s is TimezoneISO {
//   const matchRegex = s.match(TIMEZONE_ISO_REGEX) !== null;
//   const isValidDate = new Date(s).toString() !== 'Invalid Date'
//   if (!matchRegex || !isValidDate) throw new Error(`assertTimezoneISO(), invalid argument. Evaluating ${s}`)
// }

export function toTimezoneISO(s: string): TimezoneISO {
  const matchRegex = s.match(TIMEZONE_ISO_REGEX) !== null;
  const isValidDate = new Date(s).toString() !== 'Invalid Date'
  // if (!matchRegex || !isValidDate) throw new Error(`toTimezoneISO(), invalid argument. Evaluating ${s}`)
  if (!matchRegex) throw new Error(`toTimezoneISO(), invalid argument. Doesn't match Regexp. Evaluating ${s}`)
  if (!isValidDate) throw new Error(`toTimezoneISO(), invalid argument. Is not a valid date format. Evaluating ${s}`)
  return s as TimezoneISO
}





export function getOffsetHours(offset: TimezoneOffset): number {
  const signString = offset.match(TIMEZONE_OFFSET_REGEX)![1]
  const hoursString = offset.match(TIMEZONE_OFFSET_REGEX)![2] ?? offset.match(TIMEZONE_OFFSET_REGEX)![4]
  return Number(signString + hoursString);
}

export function getOffsetMinutes(offset: TimezoneOffset): number {
  const signString = offset.match(TIMEZONE_OFFSET_REGEX)![1]
  const minutesString = offset.match(TIMEZONE_OFFSET_REGEX)![3] ?? offset.match(TIMEZONE_OFFSET_REGEX)![5]
  return Number(signString + minutesString);
}

export function shiftedDate(date: Date, offset: TimezoneOffset): Date {
  const dateMs = date.getTime()
  const correctedHoursMs = getOffsetHours(offset) * 60 * 60 * 1000
  const correctedMinutesMs = getOffsetMinutes(offset) * 60 * 1000
  const correctedDateMs = dateMs + correctedHoursMs + correctedMinutesMs
  return new Date(correctedDateMs)
}


export function createTimezone(timezoneDate: TimezoneDate, timezoneTime: TimezoneTime, offset: TimezoneOffset): Date {
  return new Date(`${timezoneDate}T${timezoneTime}${offset}`)
}


export function getTimezoneYear(date: Date, offset: TimezoneOffset): number {
  return shiftedDate(date, offset).getUTCFullYear()
}

export function getTimezoneMonth(date: Date, offset: TimezoneOffset): number {
  return shiftedDate(date, offset).getUTCMonth() + 1
}

export function getTimezoneDay(date: Date, offset: TimezoneOffset): number {
  return shiftedDate(date, offset).getUTCDate()
}

export function getTimezoneHours(date: Date, offset: TimezoneOffset): number {
  return shiftedDate(date, offset).getUTCHours()
}

export function getTimezoneMinutes(date: Date, offset: TimezoneOffset): number {
  return shiftedDate(date, offset).getUTCMinutes()
}

export function getTimezoneSeconds(date: Date, offset: TimezoneOffset): number {
  return shiftedDate(date, offset).getUTCSeconds()
}


export function getTimezoneDateString(date: Date, offset: TimezoneOffset): TimezoneDate {
  const year = getTimezoneYear(date, offset).toString()
  const month = getTimezoneMonth(date, offset).toString().padStart(2, '0')
  const day = getTimezoneDay(date, offset).toString().padStart(2, '0')
  return toTimezoneDate(`${year}-${month}-${day}`)
}

export function getTimezoneTimeString(date: Date, offset: TimezoneOffset): TimezoneTime {
  const hours = getTimezoneHours(date, offset).toString().padStart(2, '0')
  const minutes = getTimezoneMinutes(date, offset).toString().padStart(2, '0')
  const seconds = getTimezoneSeconds(date, offset).toString().padStart(2, '0')
  return toTimezoneTime(`${hours}:${minutes}:${seconds}`)
}

export function getTimezoneISOString(date: Date, offset: TimezoneOffset): TimezoneISO {
  const timezoneDate = getTimezoneDateString(date, offset)
  const timezoneTime = getTimezoneTimeString(date, offset)
  return toTimezoneISO(`${timezoneDate}T${timezoneTime}${offset}`)
}


// export function add(date: Date, nb: number, unit: 'day' | 'week' | 'month' | 'year'): Date {
//   const copy = new Date(date);

//   switch(unit) {
//     case 'day':
//       copy.setUTCDate(copy.getUTCDate() + nb);
//       return copy;
//     case 'week':
//       copy.setUTCDate(copy.getUTCDate() + nb * 7);
//       return copy;
//     case 'month':
//       copy.setUTCMonth(copy.getUTCMonth() + nb);
//       return copy;
//     case 'year':
//       copy.setUTCFullYear(copy.getUTCFullYear() + nb);
//       return copy;
//   }
// }

