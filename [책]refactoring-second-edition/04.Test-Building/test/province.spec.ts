import { expect } from "chai";
import { Doc, Province } from "../src/Province";

function sampleProvinceData(): Doc {
  return {
    name: "asia",
    producers: [
      {
        name: "bizantium",
        cost: 10,
        production: 9,
      },
      {
        name: "attalia",
        cost: 12,
        production: 10,
      },
      {
        name: "sinope",
        cost: 10,
        production: 6,
      },
    ],
    demand: 30,
    price: 20,
  };
}

describe("province", () => {
  let asia: Province;

  beforeEach(() => {
    asia = new Province(sampleProvinceData());
  });
  it("shortfall", () => {
    expect(asia.shortfall).equal(5);
  });

  it("profit", () => {
    expect(asia.profit).equal(230);
  });

  it("change production", () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).equal(-6);
    expect(asia.profit).equal(292);
  });

  describe("no producers", () => {
    let noProducers: Province;

    beforeEach(() => {
      const data = {
        name: "no producers",
        producers: [],
        demand: 30,
        price: 20,
      };
      noProducers = new Province(data);
    });

    it("shortfall", () => {
      expect(noProducers.shortfall).equal(30);
    });

    it("profit", () => {
      expect(noProducers.profit).equal(0);
    });
  });

  it("zero demand", () => {
    asia.demand = 0;
    expect(asia.shortfall).equal(-25);
    expect(asia.profit).equal(0);
  });

  it("negative demand", () => {
    asia.demand = -1;
    expect(asia.shortfall).equal(-26);
    expect(asia.profit).equal(-10);
  });
});
