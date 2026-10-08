import type { ComponentProps, ElementType } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ObjectType = Record<PropertyKey, any>;

export type CustomComponentProps<E extends ElementType, P extends ObjectType> = Omit<
   ComponentProps<E>,
   keyof P
> &
   P;
