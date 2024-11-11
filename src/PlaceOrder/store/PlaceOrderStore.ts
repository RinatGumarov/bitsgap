import { action, computed, makeObservable, observable } from "mobx";

import { MAX_TAKE_PROFIT_TARGETS } from "PlaceOrder/constants";
import { last } from "remeda";
import type { OrderSide } from "../model";

type TakeProfitTarget = {
  price: number;
  amount: number;
  profit: number;
  valid: boolean;
};

export class PlaceOrderStore {
  constructor() {
    makeObservable(this);
  }

  @observable activeOrderSide: OrderSide = "buy";
  @observable price = 0;
  @observable amount = 0;
  @observable takeProfitExpanded = false;
  @observable takeProfitTargets: TakeProfitTarget[] = [];
  @observable validationError: string | undefined;

  @computed get total(): number {
    return this.price * this.amount;
  }

  @computed get projectedProfit(): number {
    const total = this.total;
    return this.takeProfitTargets.reduce(
      (sum, tp) => sum + (((total * tp.profit) / 100) * tp.amount) / 100,
      0
    );
  }

  @computed get sumTakeProfitAmount(): number {
    return this.takeProfitTargets.reduce((sum, tp) => tp.amount + sum, 0);
  }

  @action
  public setOrderSide = (side: OrderSide) => {
    this.activeOrderSide = side;
    this.updateTakeProfitPrices();
  };

  @action
  public setPrice = (price: number) => {
    this.price = price;
  };

  @action
  public setAmount = (amount: number) => {
    this.amount = amount;
  };

  @action
  public setTotal = (total: number) => {
    this.amount = this.price > 0 ? total / this.price : 0;
  };

  @action
  public toggleTakeProfit = () => {
    this.takeProfitExpanded = !this.takeProfitExpanded;
    if (this.takeProfitTargets.length) {
      this.takeProfitTargets = [];
    } else {
      this.addTakeProfitTarget();
    }
  };

  @action
  public addTakeProfitTarget = () => {
    if (this.takeProfitTargets.length === MAX_TAKE_PROFIT_TARGETS) {
      return;
    }
    const profit = (last(this.takeProfitTargets)?.profit ?? 0) + 2;
    this.takeProfitTargets.push({
      price: 0,
      amount: 20,
      profit: 0,
      valid: true,
    });
    this.updateAmountSum();
    this.setTakeProfitTargetProfit(this.takeProfitTargets.length - 1, profit);
  };

  @action
  public setTakeProfitTargetPrice = (index: number, price: number) => {
    const target = this.takeProfitTargets[index];
    if (target) {
      target.price = price;
      if (this.price !== 0) {
        target.profit = (price / this.price) * 100 - 100;
      }
    }
  };

  @action
  public setTakeProfitTargetAmount = (index: number, amount: number) => {
    const target = this.takeProfitTargets[index];
    if (target) {
      target.amount = amount;
      this.updateAmountSum();
    }
  };

  @action
  public setTakeProfitTargetProfit = (index: number, profit: number) => {
    const target = this.takeProfitTargets[index];
    if (target) {
      target.profit = profit;
      this.updateTakeProfitPriceByIndex(index);
    }
  };

  @action
  public removeTakeProfitTarget = (index: number) => {
    this.takeProfitTargets.splice(index, 1);
  };

  @action
  public submitForm = () => {
    this.validate();
  };

  private updateAmountSum = () => {
    const sumAmount = this.sumTakeProfitAmount;
    if (sumAmount > 100) {
      const largestAmountTakeProfit = this.takeProfitTargets.reduce(
        (largest, current) =>
          current.amount > largest.amount ? current : largest
      );
      largestAmountTakeProfit.amount -= sumAmount - 100;
    }
  };

  private updateTakeProfitPriceByIndex = (index: number) => {
    const takeProfitTarget = this.takeProfitTargets[index];
    if (this.activeOrderSide === "buy") {
      takeProfitTarget.price =
        this.price + (takeProfitTarget.profit / 100) * this.price;
    } else {
      takeProfitTarget.price =
        this.price - (takeProfitTarget.profit / 100) * this.price;
    }
  };

  private updateTakeProfitPrices = () => {
    this.takeProfitTargets
      .map((_, i) => i)
      .forEach(this.updateTakeProfitPriceByIndex);
  };

  private validate = () => {
    this.validationError = undefined;
    this.takeProfitTargets.forEach((tp) => (tp.valid = true));
    if (
      this.takeProfitTargets.reduce((sum, tp) => sum + tp.profit, 0) * 100 >
      500
    ) {
      this.validationError = "Maximum profit sum is 500%";
      return;
    }
    if (
      this.takeProfitTargets.reduce((result, tp) => {
        if (tp.profit < 0.01) {
          tp.valid = false;
          return true;
        }
        return result;
      }, false)
    ) {
      this.validationError = "Minimum value is 0.01%";
      return;
    }
    if (
      this.takeProfitTargets
        .map((tp, i, tps) => (i === 0 ? false : tp.profit < tps[i - 1].profit))
        .some((result) => result)
    ) {
      this.validationError =
        "Each target's profit should be greater than the previous one";
      return;
    }
    if (
      this.takeProfitTargets.map((tp) => tp.price < 0).some((result) => result)
    ) {
      this.validationError =
        "Each target's profit should be greater than the previous one";
      return;
    }
    const sumAmount = this.takeProfitTargets.reduce(
      (sum, tp) => sum + tp.amount,
      0
    );
    if (sumAmount > 100) {
      this.validationError = `${sumAmount}% out of 100% selected. Please decrease by ${
        sumAmount - 100
      }%`;
      return;
    }
    if (sumAmount < 100) {
      this.validationError = `${sumAmount}% out of 100% selected. Please increase by ${
        100 - sumAmount
      }%`;
      return;
    }
  };
}
