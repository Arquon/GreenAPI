import { BaseInput, type BaseInputProps } from "./BaseInput";

interface PatternInputProps extends BaseInputProps {
   patternRegex: RegExp;
}

export const PatternInput = ({ value, onChange: onChangeProps, patternRegex }: PatternInputProps) => {
   const onChange = (inputValue: string) => {
      const clearedValue = inputValue.replace(patternRegex, "");

      onChangeProps(clearedValue);
   };

   return <BaseInput value={value} onChange={onChange} />;
};
