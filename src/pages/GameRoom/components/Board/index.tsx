import type { GameSymbols } from "src/types/gameSymbols";
import stylesClasses from "src/pages/GameRoom/components/Board/styles.module.scss";

interface BoardProps {
  fields: GameSymbols[];
  handleChangeTurn: (index: number) => void;
}

const Board = ({ fields, handleChangeTurn }: BoardProps): JSX.Element => {
  return (
    <div className={stylesClasses.board}>
      {fields.map((fieldValue, index) => (
        <button
          key={index}
          className={stylesClasses.ceil}
          onClick={() => handleChangeTurn(index)}
        >
          {fieldValue}
        </button>
      ))}
    </div>
  );
};

export default Board;
