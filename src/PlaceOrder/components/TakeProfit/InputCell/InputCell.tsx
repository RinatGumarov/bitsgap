import { SvgIcon, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { TextButton } from "shared/components/TextButton/TextButton";
import styles from "./InputCell.module.css";

interface Props {
  onBlur: (value: React.FocusEvent<HTMLInputElement, Element>) => void;
  initialValue: number;
  suffix?: string;
  removeHandler?: () => void;
  min?: number;
  max?: number;
}

export const InputCell: FC<Props> = ({
  onBlur,
  initialValue,
  suffix,
  removeHandler,
  min = -Infinity,
  max = Infinity,
}) => {
  const [value, setValue] = useState(initialValue.toString());
  useEffect(() => {
    setValue(initialValue.toString());
  }, [initialValue]);

  const handleChange = (e: any) => {
    const parsed = parseFloat(e.target.value);
    if (parsed > max) {
      setValue(String(max));
    } else if (parsed < min) {
      setValue(String(min));
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <div className={styles.root}>
      <TextField
        variant="standard"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <div className={styles.inputWrapper}>
        {!!suffix && <div>{suffix}</div>}
      </div>
      {!!removeHandler && (
        <TextButton onClick={removeHandler} className={styles.removeButton}>
          <SvgIcon>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.3"
                d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                fill="#565861"
              />
              <path
                d="M5.19947 5.19947C4.93351 5.46543 4.93351 5.89664 5.19947 6.16259L7.12581 8.08894L5.19954 10.0152C4.93358 10.2812 4.93358 10.7124 5.19954 10.9783C5.4655 11.2443 5.89671 11.2443 6.16267 10.9783L8.08894 9.05206L10.0151 10.9782C10.2811 11.2442 10.7123 11.2442 10.9782 10.9782C11.2442 10.7123 11.2442 10.2811 10.9782 10.0151L9.05206 8.08894L10.9783 6.16271C11.2443 5.89675 11.2443 5.46554 10.9783 5.19958C10.7123 4.93362 10.2811 4.93362 10.0152 5.19958L8.08894 7.12581L6.16259 5.19947C5.89663 4.93351 5.46543 4.93351 5.19947 5.19947Z"
                fill="#A2A7B9"
              />
            </svg>
          </SvgIcon>
        </TextButton>
      )}
    </div>
  );
};
