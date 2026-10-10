import type { BaseInputProps } from "./BaseInput";
import { PatternInput } from "./PatternInput";

const numberInputRegex = /[^\d]/g;

interface NumberInputProps extends BaseInputProps {}

export const NumberInput = ({ ...restProps }: NumberInputProps) => (
   <PatternInput patternRegex={numberInputRegex} {...restProps} />
);
