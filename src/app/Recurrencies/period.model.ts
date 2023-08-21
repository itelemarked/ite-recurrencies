
const PERIOD_UNITS = ['milliseconds',  'seconds',  'minutes',  'hours',  'days',  'weeks',  'months',  'years'] as const;
export type PeriodUnit = typeof PERIOD_UNITS[number];
// export type PeriodUnit = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'


export interface IPeriod {
  nb: number,
  unit: string
}


function validateNb(nb: number) {
  const isInteger = Number.isInteger(nb)
  const isPositive = nb > 0
  if (!isInteger || !isPositive) throw new Error(`Invalid PositiveInteger, evaluating ${nb}`)
}

function validateUnit(s: string) {
  if (!PERIOD_UNITS.includes(s as PeriodUnit)) throw new Error(`Invalid PeriodUnit, evaluating ${s}`)
}


export class Period {

  private _nb: number
  private _unit: string

  private constructor(nb: number, unit: string) {
    validateNb(nb)
    validateUnit(unit)
    this._nb = nb
    this._unit = unit
  }

  static from(nb: number, unit: string) {
    validateNb(nb)
    validateUnit(unit)
    return new Period(nb, unit)
  }

  get nb(): number {
    return this._nb;
  }

  get unit(): string {
    return this._unit;
  }

  toString(): string {
    const unitString = this._nb > 1 ? this._unit : this._unit.replace(/s$/, '')
    return `${this._nb} ${unitString}`
  }

  setNb(nb: number): Period {
    validateNb(nb)
    const unit = this._unit;
    return new Period(nb, unit)
  }

  setUnit(unit: string): Period {
    validateUnit(unit)
    const nb = this._nb;
    return new Period(nb, unit);
  }

  copy(): Period {
    const {nb, unit} = this;
    return new Period(nb, unit)
  }

}
