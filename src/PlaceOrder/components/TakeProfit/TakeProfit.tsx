import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { MAX_TAKE_PROFIT_TARGETS } from "PlaceOrder/constants";
import classNames from "classnames";
import { observer } from "mobx-react";
import { Switch } from "shared/components/Switch/Switch";
import { useStore } from "../../context";
import { AddTargetButton } from "../AddTargetButton/AddTargetButton";
import { SectionTitle } from "../SectionTitle/SectionTitle";

import { InputCell } from "./InputCell/InputCell";
import styles from "./TakeProfit.module.scss";

const TakeProfit = observer(() => {
  const {
    activeOrderSide,
    takeProfitExpanded,
    toggleTakeProfit,
    takeProfitTargets,
    removeTakeProfitTarget,
    projectedProfit,
    setTakeProfitTargetProfit,
    setTakeProfitTargetPrice,
    setTakeProfitTargetAmount,
    validationError,
  } = useStore();

  console.log(takeProfitTargets);

  return (
    <Accordion
      className={styles.root}
      disableGutters
      expanded={takeProfitExpanded}
    >
      <AccordionSummary
        aria-controls="take-profit-content"
        id="take-profit-header"
        className={styles.headerWrapper}
      >
        <div className={styles.header}>
          <SectionTitle
            title="Take Profit"
            tooltip={
              activeOrderSide === "buy"
                ? "Limit sell order will be placed if reaches target price"
                : "Limit buy order will be placed if falls targets price"
            }
            tooltipAlignment="start"
            className={classNames(!takeProfitExpanded && styles.labelDisabled)}
          />
          <Switch checked={takeProfitExpanded} onChange={toggleTakeProfit} />
        </div>
      </AccordionSummary>
      <AccordionDetails className={styles.contentWrapper}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell
                  className={classNames(styles.cell, styles.profitCell)}
                >
                  Profit
                </TableCell>
                <TableCell
                  className={classNames(styles.cell, styles.priceCell)}
                >
                  Target price
                </TableCell>
                <TableCell
                  className={classNames(styles.cell, styles.amountCell)}
                >
                  Amount to sell
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableContent}>
              {takeProfitTargets.map((target, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      className={classNames(styles.profitCell, styles.cell)}
                    >
                      <InputCell
                        initialValue={target.profit}
                        onBlur={(e) =>
                          setTakeProfitTargetProfit(
                            index,
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min={0}
                        max={100}
                        suffix="%"
                      />
                    </TableCell>
                    <TableCell
                      className={classNames(styles.priceCell, styles.cell)}
                    >
                      <InputCell
                        initialValue={target.price}
                        onBlur={(e) =>
                          setTakeProfitTargetPrice(
                            index,
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min={0}
                        suffix="USDT"
                      />
                    </TableCell>
                    <TableCell
                      className={classNames(styles.amountCell, styles.cell)}
                    >
                      <InputCell
                        initialValue={target.amount}
                        onBlur={(e) =>
                          setTakeProfitTargetAmount(
                            index,
                            parseFloat(e.target.value) || 0
                          )
                        }
                        min={0}
                        max={100}
                        suffix="%"
                        removeHandler={() => removeTakeProfitTarget(index)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {!!validationError && (
          <div className={styles.validationError}>{validationError}</div>
        )}
        {takeProfitTargets.length < MAX_TAKE_PROFIT_TARGETS && (
          <AddTargetButton className={styles.addTargetButton} />
        )}
        <div className={styles.projectedProfitWrapper}>
          Projected profit
          <div />
          {projectedProfit} USDT
        </div>
      </AccordionDetails>
    </Accordion>
  );
});

export { TakeProfit };
