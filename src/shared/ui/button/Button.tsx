import type { CustomComponentProps } from "@/shared/lib/types/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

const buttonVariants = cva("bg-accent hover:bg-accent-light transition-bg duration-100", {
   variants: {
      variant: {
         icon: "rounded-xl w-8 h-8 flex items-center justify-center text-2xl font-medium cursor-pointer",
      },
   },
});

type ButtonOwnProps<E extends ElementType> = {
   as?: E;
} & Required<VariantProps<typeof buttonVariants>>;

const defaultTagType = "button";

type ButtonProps<E extends ElementType = typeof defaultTagType> = CustomComponentProps<E, ButtonOwnProps<E>>;

export const Button = <E extends ElementType>({ as, variant, ...restProps }: ButtonProps<E>) => {
   const Tag = as || defaultTagType;

   const className = buttonVariants({ variant });

   return <Tag className={className} {...restProps} />;
};
