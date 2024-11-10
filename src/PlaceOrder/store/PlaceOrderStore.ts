import Decimal from "decimal.js";
import { action, computed, makeObservable, observable } from "mobx";

import type { OrderSide } from "../model";

export class PlaceOrderStore {
  constructor() {
    makeObservable(this);
  }

  @observable activeOrderSide: OrderSide = "buy";
  @observable price = new Decimal("0");
  @observable amount = new Decimal("0");

  @computed get total(): Decimal {
    return this.price.mul(this.amount);
  }

  @action
  public setOrderSide = (side: OrderSide) => {
    this.activeOrderSide = side;
  };

  @action
  public setPrice = (price: string | Decimal) => {
    this.price = new Decimal(price);
  };

  @action
  public setAmount = (amount: string | Decimal) => {
    this.amount = new Decimal(amount);
  };

  @action
  public setTotal = (total: string | Decimal) => {
    const decimalTotal = new Decimal(total);
    this.amount = this.price.gt("0")
      ? decimalTotal.div(this.price)
      : new Decimal("0");
  };
}
