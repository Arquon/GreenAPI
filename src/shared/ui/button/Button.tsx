import type { CustomComponentProps } from "@/shared/lib/types/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

const buttonVariants = cva(
   "flex items-center justify-center cursor-pointer bg-accent hover:bg-accent-light transition-bg duration-100 disabled:bg-disabled",
   {
      variants: {
         size: {
            small: "rounded-lg px-3 py-1 text-sm",
            default: "rounded-lg px-5 py-3",
            icon: "rounded-[14px] w-8 h-8",
         },
      },
   }
);

type ButtonOwnProps<E extends ElementType> = {
   as?: E;
} & Required<VariantProps<typeof buttonVariants>>;

const defaultTagType = "button";

export type ButtonProps<E extends ElementType> = CustomComponentProps<E, ButtonOwnProps<E>>;

export const Button = <E extends ElementType = typeof defaultTagType>({
   as,
   size,
   ...restProps
}: ButtonProps<E>) => {
   const Tag = as || defaultTagType;

   const className = buttonVariants({ size });

   return <Tag {...restProps} className={className} />;
};
