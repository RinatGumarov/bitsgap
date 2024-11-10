import {
  TextInput,
  TextInputProps,
} from "shared/components/TextInput/TextInput";

type Props = Omit<TextInputProps, "onChange" | "value"> & {
  value: string | null;
  min?: number;
  max?: number;
  decimalScale?: number;
  onChange?(value: string): void;
};

function NumberInput({
  value,
  min,
  max,
  decimalScale,
  onChange,
  onBlur,
  onFocus,
  onMouseUp,
  onKeyUp,
  InputProps,
  ...rest
}: Props) {
  return (
    <TextInput
      {...rest}
      value={value}
      InputProps={{ ...InputProps }}
      onChange={onChange}
    />
  );
}

export { NumberInput };
