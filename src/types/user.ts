import { GameSymbols } from "src/types/gameSymbols";

export interface User {
  id: string;
  symbol: GameSymbols;
  name: string;
}
