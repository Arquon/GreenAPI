import type { CustomComponentProps } from "@/shared/lib";
import type { ChangeEvent } from "react";

interface BaseTextareaOwnProps {
   value: string;
   onChange: (value: string) => void;
}

type BaseTextareaProps = Omit<CustomComponentProps<"textarea", BaseTextareaOwnProps>, "className">;

export const BaseTextarea = ({ value, onChange: onChangeProps, ...restProps }: BaseTextareaProps) => {
   const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeProps(event.target.value);
   };

   const className = "w-full resize-none outline-none field-sizing-content";

   return (
      <div>
         <textarea {...restProps} value={value} onChange={onChange} className={className} />
      </div>
   );
};
