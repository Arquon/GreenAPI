import { useState } from "react";

export function usePreviousValue<T>(currentValue: T) {
   const [state, setState] = useState<{ current: T; previous: T | undefined }>({
      previous: undefined,
      current: currentValue,
   });

   if (state.current !== currentValue) {
      setState({
         previous: state.current,
         current: currentValue,
      });
   }

   return state.previous;
}
