import type { User } from "src/types/user";
import type { GameSymbols } from "src/types/gameSymbols";

export interface Room {
  name: string;
  id: string;
  users: User[];
  fields: GameSymbols[];
  turn: GameSymbols;
}
