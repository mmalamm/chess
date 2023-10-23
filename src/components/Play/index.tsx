import { ChessContextProvider } from "@/hooks/ChessContext";
import { Play } from "./Play";

const PlayPage = () => {
  return (
    <ChessContextProvider>
      <Play />
    </ChessContextProvider>
  );
};

export default PlayPage;
