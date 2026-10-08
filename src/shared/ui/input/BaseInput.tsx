import type { CustomComponentProps } from "@/shared/lib";
import type { ChangeEvent } from "react";

interface BaseInputOwnProps {
   onChange: (value: string) => void;
}

type BaseInputProps = Omit<CustomComponentProps<"input", BaseInputOwnProps>, "type" | "classname">;

export const BaseInput = ({ onChange: onChangeProps, ...restProps }: BaseInputProps) => {
   console.log({ onChangeProps });

   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChangeProps(event.target.value);
   };

   const classname = "bg-input w-full h-full py-1 px-2 placeholder:text-secondary";

   return (
      <div className="rounded-lg overflow-hidden">
         <input {...restProps} onChange={onChange} type="text" className={classname} />
      </div>
   );
};
