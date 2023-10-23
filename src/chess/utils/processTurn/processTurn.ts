import isThisColorCheckMated from "../getSetOfPossibleMoves/pieceFns/utils/utils";
import { dd } from "../helpers";
import { GameState, TurnString } from "../types";
import getNewBoardMap from "./getNewBoardMap";
import getNewCastleState from "./getNewCastleState";

export function processTurn(
  turn: TurnString,
  currentState: GameState
): GameState {
  const newGameData: GameState = dd(currentState);

  // update whosTurn
  const newWhosTurn = newGameData.whosTurn === "b" ? "w" : "b";
  newGameData.whosTurn = newWhosTurn;

  // update turns
  newGameData.turns = [...currentState.turns, turn];

  // update castle
  const newCastleState = renderNewCastleState(turn, currentState);
  newGameData.castle = newCastleState;

  // update boardMap
  const newBoardMap = renderNewBoardMap(turn, currentState);
  newGameData.boardMap = newBoardMap;

  // update winner
  const newWinner = getWinner(newGameData);
  newGameData.winner = newWinner;

  return newGameData;
}

function renderNewCastleState(turn: TurnString, currentState: GameState) {
  const newCastle = getNewCastleState(turn, {
    whosTurn: currentState.whosTurn,
    boardMap: currentState.boardMap,
    castle: currentState.castle,
  });
  return newCastle;
}

function renderNewBoardMap(turn: TurnString, currentState: GameState) {
  const newBoardMap = getNewBoardMap(turn, {
    boardMap: currentState.boardMap,
    whosTurn: currentState.whosTurn,
    turns: currentState.turns,
  });
  return newBoardMap;
}


function getWinner(updatedState: GameState) {
  const color = updatedState.whosTurn;
  if (
    isThisColorCheckMated({
      color,
      gameState: {
        whosTurn: color,
        boardMap: updatedState.boardMap,
        castle: updatedState.castle,
        turns: updatedState.turns,
      },
    })
  ) {
    return color === "w" ? "b" : "w";
  }
  return null;
}