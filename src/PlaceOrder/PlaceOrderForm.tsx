import { observer } from "mobx-react";

import { Button } from "shared/components/Button/Button";
import { NumberInput } from "shared/components/NumberInput/NumberInput";
import { QuestionTooltip } from "shared/components/QuestionTooltip/QuestionTooltip";

import { PlaceOrderTypeSwitch } from "./components/PlaceOrderTypeSwitch/PlaceOrderTypeSwitch";
import { TakeProfit } from "./components/TakeProfit/TakeProfit";
import { BASE_CURRENCY, QUOTE_CURRENCY } from "./constants";
import { useStore } from "./context";

import Decimal from "decimal.js";
import styles from "./PlaceOrderForm.module.scss";

export const PlaceOrderForm = observer(() => {
  const {
    activeOrderSide,
    price,
    total,
    amount,
    setPrice,
    setAmount,
    setTotal,
    setOrderSide,
  } = useStore();

  return (
    <form className={styles.root}>
      <div className={styles.label}>
        Market direction{" "}
        <QuestionTooltip message="Market direction description" />
      </div>
      <div className={styles.content}>
        <div className={styles.typeSwitch}>
          <PlaceOrderTypeSwitch
            activeOrderSide={activeOrderSide}
            onChange={setOrderSide}
          />
        </div>
        <NumberInput
          label={`Price, ${QUOTE_CURRENCY}`}
          value={price.toString()}
          onChange={(value) => setPrice(new Decimal(value || "0"))}
        />
        <NumberInput
          value={amount.toString()}
          label={`Amount, ${BASE_CURRENCY}`}
          onChange={(value) => setAmount(new Decimal(value || "0"))}
        />
        <NumberInput
          value={total.toString()}
          label={`Total, ${QUOTE_CURRENCY}`}
          onChange={(value) => setTotal(new Decimal(value || "0"))}
        />
        <TakeProfit />
        <div className={styles.submit}>
          <Button
            color={activeOrderSide === "buy" ? "green" : "red"}
            type="submit"
            fullWidth
          >
            {activeOrderSide === "buy"
              ? `Buy ${BASE_CURRENCY}`
              : `Sell ${QUOTE_CURRENCY}`}
          </Button>
        </div>
      </div>
    </form>
  );
});
