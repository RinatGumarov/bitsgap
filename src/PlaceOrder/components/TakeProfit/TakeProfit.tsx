import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import classNames from "classnames";
import { observer } from "mobx-react";
import { Switch } from "shared/components/Switch/Switch";
import { useStore } from "../../context";
import { AddTargetButton } from "../AddTargetButton/AddTargetButton";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import styles from "./TakeProfit.module.scss";

const TakeProfit = observer(() => {
  const { activeOrderSide, takeProfitExpanded, toggleTakeProfit } = useStore();

  return (
    <Accordion
      className={styles.root}
      disableGutters
      expanded={takeProfitExpanded}
      slotProps={{ transition: { unmountOnExit: true } }}
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
              <TableRow>
                <TableCell className={styles.cell}>{"row.name"}</TableCell>
                <TableCell className={styles.cell}>{"row.calories"}</TableCell>
                <TableCell className={styles.cell}>{"row.calories"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.cell}>{"row.name"}</TableCell>
                <TableCell className={styles.cell}>{"row.calories"}</TableCell>
                <TableCell className={styles.cell}>{"row.calories"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <AddTargetButton />
      </AccordionDetails>
    </Accordion>
  );
});

export { TakeProfit };
