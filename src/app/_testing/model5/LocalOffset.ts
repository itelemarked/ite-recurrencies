

export class LocalOffset {

  private _offsetString: string;
  private _hours: number;
  private _minutes: number;


  constructor(offsetString: string) {
    const regex = /^([+-])(0[0-9]|1[0-2]):([0-5][0-9])$/

    const match = offsetString.match(regex)
    if (match === null) throw new Error(`LocalOffset constructor, invalid argument. Should be formatted: '+xx:xx'. Evaluating ${offsetString}`)

    const sign = match[1]
    const hours = match[2]
    const minutes = match[3]

    this._offsetString = offsetString;
    this._hours = +(sign + hours);
    this._minutes = +(sign + minutes);
  }

  toString() {
    return this._offsetString;
  }

  hours() {
    return this._hours;
  }

  minutes() {
    return this._minutes;
  }

}
