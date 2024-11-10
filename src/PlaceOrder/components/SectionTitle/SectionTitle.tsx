import classNames from "classnames";
import { QuestionTooltip } from "shared/components/QuestionTooltip/QuestionTooltip";
import styles from "./SectionTitle.module.scss";

interface Props {
  title: string;
  tooltip?: string;
  tooltipAlignment?: "start" | "end";
  className?: string;
}

export const SectionTitle = ({
  title,
  tooltip,
  tooltipAlignment = "end",
  className,
}: Props) => {
  return (
    <div className={classNames(styles.root, className)}>
      <span
        className={classNames(tooltipAlignment === "start" && styles.second)}
      >
        {title}
      </span>
      {!!tooltip && <QuestionTooltip message={tooltip} />}
    </div>
  );
};
