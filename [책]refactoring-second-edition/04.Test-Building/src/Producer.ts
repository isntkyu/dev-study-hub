import { Province } from "./Province";

export type Data = {
  name: string;
  cost: number;
  production?: number;
};

export class Producer {
  private _cost: number;
  private _name: string;
  private _province: Province;
  private _production: number;

  constructor(aProvince: Province, data: Data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production ? data.production : 0;
  }

  get name(): string {
    return this._name;
  }
  get cost(): number {
    return this._cost;
  }
  set cost(arg: number) {
    this._cost = arg;
  }

  get production(): number {
    return this._production;
  }

  set production(amountStr) {
    const amount = amountStr;
    const newProduction = Number.isNaN(amount) ? 0 : amount;
    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}
