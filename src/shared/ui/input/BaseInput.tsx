import type { CustomComponentProps } from "@/shared/lib";
import type { ChangeEvent } from "react";

interface BaseInputOwnProps {
   onChange: (value: string) => void;
   value: string;
}

export type BaseInputProps = Omit<CustomComponentProps<"input", BaseInputOwnProps>, "type" | "className">;

export const BaseInput = ({ onChange: onChangeProps, ...restProps }: BaseInputProps) => {
   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChangeProps(event.target.value);
   };

   const classname = "w-full h-full py-1 px-2 placeholder:text-secondary outline-none";

   return (
      <div className="rounded-lg bg-input">
         <input {...restProps} onChange={onChange} type="text" className={classname} />
      </div>
   );
};
