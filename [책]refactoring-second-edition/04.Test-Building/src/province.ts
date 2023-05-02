import { Producer } from "./Producer";

export type Doc = {
  name: string;
  demand: number;
  price: number;
  producers: any[];
};

function convertValue(value: any): any {
  if (typeof value === "number") {
    return Number(value);
  } else if (typeof value === "string") {
    return value;
  } else {
    throw new Error("Invalid value type");
  }
}

export class Province {
  private _name: string;
  private _producers: Producer[];
  private _totalProduction: number;
  private _demand: number | string;
  private _price: number;

  constructor(doc: Doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg: Producer) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get name(): string {
    return this._name;
  }
  get producers(): Producer[] {
    return this._producers.slice();
  }
  get totalProduction(): number {
    return this._totalProduction;
  }
  set totalProduction(arg: number) {
    this._totalProduction = arg;
  }
  get demand(): number | string {
    return this._demand;
  }
  set demand(arg: number | string) {
    this._demand = arg;
  }
  get price(): number {
    return this._price;
  }
  set price(arg: number) {
    this._price = arg;
  }

  get shortfall(): number {
    return convertValue(this.demand) - this.totalProduction;
  }

  get profit(): number {
    return this.demandValue - this.demandCost;
  }

  get demandValue(): number {
    return this.satisfiedDemand * this.price;
  }

  get satisfiedDemand(): number {
    return Math.min(convertValue(this.demand), this.totalProduction);
  }

  get demandCost(): number {
    let remainingDemand = convertValue(this.demand);
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
}
