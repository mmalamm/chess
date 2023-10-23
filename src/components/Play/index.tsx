import { ChessContextProvider } from "@/hooks/GameContext";
import Play from "./Play";

const PlayPage = () => {
  return (
    <ChessContextProvider>
      <Play />
    </ChessContextProvider>
  );
};

export default PlayPage;
