import isNumber from "lodash/isNumber";
import { FC, useEffect, useState } from "react";

import Box from "../../components/Box";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Wrapper from "../../layouts/Wrapper";

import { findMovingCellIndex, hasEveryCellCorrectPosition } from "../../utils";

import { DirectionStrings } from "../../types";

import { useCells } from "../../hooks/useCells";
import { useKeyPress } from "../../hooks/useKeyPress";
import { useMixing } from "../../hooks/useMixing";
import { useMoveCount } from "../../hooks/useMoveCount";

import styles from "./styles.module.scss";

const Home: FC = () => {
  const { cells, swapCells } = useCells();

  const { moveCount, increaseMoveCount, resetMoveCount } = useMoveCount();

  const {
    isMix,
    mixCount,
    decreaseMixCount,
    mixSpeed,
    startStopWatch,
    startMixing,
  } = useMixing(cells, makeMove);

  const [isWon, setIsWon] = useState<boolean>(false);

  const pressedKey = useKeyPress();

  useEffect(() => {
    if (!pressedKey) return;

    makeMove(true, null, pressedKey);
  }, [pressedKey]);

  useEffect(() => {
    if (!moveCount) return;
    setIsWon(hasEveryCellCorrectPosition(cells));
  }, [moveCount]);

  function makeMove(
    isForward: boolean = true,
    cellIndex: number | null = null,
    direction: DirectionStrings | null = null
  ): void {
    if (isMix && isForward) return;

    const index =
      !cellIndex && direction
        ? findMovingCellIndex(cells, direction)
        : cellIndex;

    if (!isNumber(index)) return;

    swapCells(index);

    if (isForward) {
      increaseMoveCount();
    } else {
      decreaseMixCount();
      resetMoveCount();
    }
  }

  const handleCellClick = (index: number) => (): void => makeMove(true, index);

  const handleArrowClick = (direction: DirectionStrings) => (): void =>
    makeMove(true, null, direction);

  const handleButtonClick = (): void => startMixing();

  const handleButtonMouseDown = (): void => {
    if (isWon) setIsWon(false);

    startStopWatch();
  };

  return (
    <section className={styles.container}>
      <Wrapper>
        <Title title="«Пятнашки»" />
        <Box
          cells={cells}
          onCellClick={handleCellClick}
          isWon={isWon}
          moveCount={moveCount}
          mixSpeed={mixSpeed}
          pressedKey={pressedKey}
          onArrowClick={handleArrowClick}
        />
        <Button
          onClick={handleButtonClick}
          onMouseDown={handleButtonMouseDown}
          mixCount={mixCount}
          isMix={isMix}
        />
      </Wrapper>
    </section>
  );
};

export default Home;
