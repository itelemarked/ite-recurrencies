
// type PositiveInteger = number & { _type: 'PositiveInteger' }

// type PeriodUnit = 'day' | 'week' | 'month' | 'year'


// interface Period {
//   readonly nb: PositiveInteger,
//   readonly unit: PeriodUnit
// }

// interface IRecurrency1 {
//   title: string,
//   readonly id: string,
//   readonly lastEvent: Date,
//   readonly period: Period,
//   expiry: () => Date,
//   setLastEvent: (val: Date) => void,
//   setExpiry: (val: Date) => void,
//   setPeriodNb: (val: PositiveInteger) => void,
//   setPeriodUnit: (val: PeriodUnit) => void
// }

// interface IRecurrency2 {
//   title: string,
//   readonly id: string,
//   readonly lastEvent: Date,
//   readonly expiry: Date,
//   readonly period: Period,
//   setLastEvent: (val: Date) => void,
//   setExpiry: (val: Date) => void,
//   setPeriodNb: (val: PositiveInteger, master?: 'lastEvent' | 'expiry') => void,
//   setPeriodUnit: (val: PeriodUnit, master?: 'lastEvent' | 'expiry') => void
// }
