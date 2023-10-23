import { ReactNode, createContext } from "react";
import { useChessMachine } from "./useChessMachine";

type x = ReturnType<typeof useChessMachine>;

export const ChessContext = createContext({} as x);

export const ChessContextProvider = ({ children }: { children: ReactNode }) => {
  const { state, send, selectors } = useChessMachine();
  return (
    <ChessContext.Provider value={{ state, send, selectors }}>
      {children}
    </ChessContext.Provider>
  );
};
