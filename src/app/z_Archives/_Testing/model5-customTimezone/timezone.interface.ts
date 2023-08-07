import { TimezoneDate, toTimezoneDate } from "./timezone-date.type";
import { TimezoneOffset, hours, minutes } from "./timezone-offset.type";
import { TimezoneTime, hh as timeHH, mm as timeMM, ss as timeSS, toTimezoneTime } from "./timezone-time.type";



// TODO:
// - rename 'local' to 'timezone' and delete 'string':
//    local-date-string --> timezone-date,
//    local-offset-string --> timezone-offset,
//    local-time-string --> timezone-time


export interface Timezone {
  offset: TimezoneOffset,
  date: TimezoneDate,
  time: TimezoneTime
}


/**
 * Define the UTC date corresponding to a date and time of a time zone.
 * Basically, same as "new Date('2022-06-01T14:00:00+02:00)"
 * But furthermore, you can keep the date using new time, or keep the time using new date (for e.g, set today date with a 23:59:59 time.)
 *
 * Accepts optional arguments to define a 'timezoneDate' and a 'timeString' for the time zone.
 * If 'timezoneDate' is not defined, it converts the current timezone today and the new timezone time to UTC
 * If 'timezoneTime' is not defined, it converts the current timezone time and the new timezone day to UTC
 *
 * Usually, at least one option should be used. Otherwise it would make no sense to use this function since it would be the same as 'new Date()'
 */
export function toDate(timezoneOffset: TimezoneOffset, options?: { timezoneDate?: TimezoneDate, timezoneTime?: TimezoneTime }): Date {
  const now = new Date()
  if (options?.timezoneDate && options?.timezoneTime) return new Date(`${options.timezoneDate}T${options.timezoneTime}${timezoneOffset}`)
  if (options?.timezoneDate) {
    const hh = now.getUTCHours().toString().padStart(2,'0')
    const mm = now.getUTCMinutes().toString().padStart(2,'0')
    const ss = now.getUTCSeconds().toString().padStart(2,'0')
    const ms = now.getUTCMilliseconds().toString().padStart(3,'0')
    return new Date(`${options.timezoneDate}T${hh}:${mm}:${ss}.${ms}Z`)
  }
  if (options?.timezoneTime) {
    const yyyy = now.getUTCFullYear().toString()
    const month = (now.getUTCMonth() + 1).toString().padStart(2,'0')
    const day = now.getUTCDate().toString().padStart(2,'0')
    return new Date(`${yyyy}-${month}-${day}T${options.timezoneTime}${timezoneOffset}`)
  }
  return now;
}

/**
 * Like toIsoString() but with the timezone offset at the end (instead of Z)
 *
 * e.g:
 * toIsoString():       '2022-06-01T12:00:00.000Z'
 * toTimezoneString():  '2022-06-01T14:00:00.000+02:00'
 */
// export function toTimezone(timezoneOffset: TimezoneOffset, date: Date): Timezone {
//   const shiftedDate = new Date(date)
//   shiftedDate.setUTCHours(date.getUTCHours() + hours(timezoneOffset))
//   shiftedDate.setUTCMinutes(date.getUTCMinutes() + minutes(timezoneOffset))

//   const yyyy = shiftedDate.getUTCFullYear().toString()
//   const mm = (shiftedDate.getUTCMonth() + 1).toString().padStart(2, '0')
//   const dd = shiftedDate.getUTCDate().toString().padStart(2, '0')

//   const h = shiftedDate.getUTCHours().toString().padStart(2,'0')
//   const min = shiftedDate.getUTCMinutes().toString().padStart(2,'0')
//   const sec = shiftedDate.getUTCSeconds().toString().padStart(2,'0')
//   const ms = shiftedDate.getMilliseconds().toString().padStart(3,'0')

//   const date = toTimezoneDate(`${yyyy}-${mm}-${dd}`)
//   const time = toTimezoneTime(`${h}:${min}:${sec}`)
//   const timezoneString = `${timezoneDate}T${timezoneTime}.${ms}${timezoneOffset}`

//   return { timezoneDate, timezoneTime, timezoneString }
// }









// export function toDate(dateString: LocalDateString, timezoneTime: LocalTimeString, offsetString: LocalOffsetString): Date {
//   const string = `${dateString}T${timezoneTime}${offsetString}`
//   return new Date(string);
// }


// export function toToday(timeString: LocalTimeString, offsetString: LocalOffsetString): Date {
//   const date = new Date()
//   date.setUTCHours(timeHH(timeString) - hours(offsetString))
//   date.setUTCMinutes(timeMM(timeString) - minutes(offsetString))
//   date.setUTCSeconds(timeSS(timeString))
//   date.setUTCMilliseconds(0)
//   return date;
// }


// export function toDateString(date: Date, offsetString: LocalOffsetString): LocalDateString {
//   const shiftedDate = new Date(date)
//   shiftedDate.setUTCHours(date.getUTCHours() + hours(offsetString))
//   shiftedDate.setUTCMinutes(date.getUTCMinutes() + minutes(offsetString))

//   const yyyy = shiftedDate.getUTCFullYear().toString()
//   const mm = (shiftedDate.getUTCMonth() + 1).toString().padStart(2, '0')
//   const dd = shiftedDate.getUTCDate().toString().padStart(2, '0')

//   return toLocalDateString(`${yyyy}-${mm}-${dd}`)
// }


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
