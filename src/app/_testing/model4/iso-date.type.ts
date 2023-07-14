import { throwTypeError } from "./error.util"

export type IsoDate = string | number | Date & { _type: 'IsoDate' }


// export function toIsoDate(arg: string | number | Date): IsoDate {
//   if (new Date(arg).toString() === 'Invalid Date') throwTypeError('Argument should be a date constructor argument', arg);

//   const date = new Date(arg).setHours(0,0,0,0);

// }
