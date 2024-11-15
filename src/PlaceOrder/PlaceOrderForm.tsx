import { observer } from "mobx-react";

import { Button } from "shared/components/Button/Button";
import { NumberInput } from "shared/components/NumberInput/NumberInput";

import { PlaceOrderTypeSwitch } from "./components/PlaceOrderTypeSwitch/PlaceOrderTypeSwitch";
import { TakeProfit } from "./components/TakeProfit/TakeProfit";
import { BASE_CURRENCY, QUOTE_CURRENCY } from "./constants";
import { useStore } from "./context";

import styles from "./PlaceOrderForm.module.scss";
import { SectionTitle } from "./components/SectionTitle/SectionTitle";

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
    submitForm,
  } = useStore();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
      className={styles.root}
    >
      <SectionTitle
        title="Market direction"
        tooltip="Market direction description"
        className={styles.title}
      />
      <div className={styles.content}>
        <div className={styles.typeSwitch}>
          <PlaceOrderTypeSwitch
            activeOrderSide={activeOrderSide}
            onChange={setOrderSide}
          />
        </div>
        <NumberInput
          label={`Price, ${QUOTE_CURRENCY}`}
          value={price}
          onChange={(value) => setPrice(Number(value))}
        />
        <NumberInput
          value={amount}
          label={`Amount, ${BASE_CURRENCY}`}
          onChange={(value) => setAmount(Number(value))}
        />
        <NumberInput
          value={total}
          label={`Total, ${QUOTE_CURRENCY}`}
          onChange={(value) => setTotal(Number(value))}
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
