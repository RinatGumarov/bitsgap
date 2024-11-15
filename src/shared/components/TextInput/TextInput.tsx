import {
  InputLabelProps as MUIInputLabelProps,
  InputBaseProps as MUIInputProps,
  TextField,
  TextFieldProps,
  TooltipProps,
} from "@mui/material";
import cn from "classnames";
import { ChangeEvent, FocusEvent, ReactNode, useState } from "react";

import { Tooltip } from "../Tooltip/Tooltip";
import styles from "./TextInput.module.scss";

type Props = Omit<
  TextFieldProps,
  "onChange" | "className" | "classes" | "error"
> & {
  error?: ReactNode;
  InputLabelProps?: Omit<
    TextFieldProps["InputLabelProps"],
    "className" | "classes"
  >;
  InputProps?: Omit<
    TextFieldProps["InputProps"],
    "disableUnderline" | "classes" | "className"
  >;
  errorPlacement?: TooltipProps["placement"];
  onChange?(value: string): void;
};

const TextInput = ({
  error,
  onChange,
  onFocus,
  onBlur,
  InputLabelProps,
  InputProps,
  errorPlacement = "top",
  variant,
  ...rest
}: Props) => {
  const inputClasses: MUIInputProps["classes"] =
    variant === "standard"
      ? {}
      : {
          root: cn(styles.inputWrapper, { [styles.error]: Boolean(error) }),
          focused: cn(styles.inputWrapper, styles.focused),
          adornedEnd: cn(styles.inputWrapper, styles.adornedEnd),
          adornedStart: cn(styles.inputWrapper, styles.adornedStart),
          input: styles.input,
        };

  const labelClasses: MUIInputLabelProps["classes"] = {
    root: styles.inputLabel,
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <Tooltip
      open={isFocused && !!error}
      message={error ?? ""}
      placement={errorPlacement}
    >
      <TextField
        {...rest}
        className={styles.root}
        variant={variant ?? "filled"}
        onChange={handleChange}
        InputLabelProps={{
          ...InputLabelProps,
          classes: labelClasses,
        }}
        InputProps={{
          ...InputProps,
          onFocus: handleFocus,
          onBlur: handleBlur,
          disableUnderline: true,
          classes: inputClasses,
        }}
      />
    </Tooltip>
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }

  function handleFocus(event: FocusEvent<HTMLInputElement>) {
    onFocus ? onFocus(event) : InputProps?.onFocus?.(event);
    setIsFocused(true);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    onBlur ? onBlur(event) : InputProps?.onBlur?.(event);
    setIsFocused(false);
  }
};

export { TextInput };
export type { Props as TextInputProps };
