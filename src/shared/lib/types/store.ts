export type AppMiddlewares = [["zustand/devtools", never], ["zustand/immer", never]];

export type Selector<T, E> = (slice: T) => E;
