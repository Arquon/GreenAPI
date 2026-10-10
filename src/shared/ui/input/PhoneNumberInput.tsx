import type { BaseInputProps } from "./BaseInput";
import { PatternInput } from "./PatternInput";

const phoneNumberRegex = /(?!^\+)[^\d]/g;

interface PhoneNumberInputProps extends BaseInputProps {}

export const PhoneNumberInput = ({ ...restProps }: PhoneNumberInputProps) => {
   return <PatternInput patternRegex={phoneNumberRegex} {...restProps} />;
};
