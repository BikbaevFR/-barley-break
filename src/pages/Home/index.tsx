import isNumber from "lodash/isNumber";
import { FC, useEffect, useState } from "react";

import Box from "../../components/Box";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Wrapper from "../../layouts/Wrapper";

import { OPPOSITE_DIRECTION } from "../../constants/direction";
import {
  findMovingCellIndex,
  hasEveryCellCorrectPosition,
  swapCells,
} from "../../utils";
import { getRandomDirection } from "../../utils/direction";

import { DirectionStrings, ICell } from "../../types";

import { useKeyPress } from "../../hooks/useKeyPress";
import { useMix } from "../../hooks/useMix";
import { useStore } from "../../store/useStore";
import styles from "./styles.module.scss";

const Home: FC = () => {
  const { cells, setCells, moveCount, setMoveCount } = useStore();

  const { isMix, mixCount, setMixCount, mixSpeed, startStopWatch, startMix } =
    useMix(mix);

  const [excludedDirection, setExcludedDirection] =
    useState<DirectionStrings | null>(null);
  const [isWon, setIsWon] = useState<boolean>(false);

  const pressedKey = useKeyPress();

  useEffect(() => {
    if (!pressedKey) return;
    if (isMix) return;

    swapCellsByDirection(pressedKey);
  }, [pressedKey]);

  function mix() {
    const emptyCell = cells.at(-1) as ICell;

    const randomDirection = getRandomDirection(
      emptyCell.position.current,
      excludedDirection
    );

    setExcludedDirection(OPPOSITE_DIRECTION[randomDirection]);

    const index = findMovingCellIndex(cells, randomDirection);

    if (isNumber(index)) {
      const swappedCells = swapCells(cells, index);
      setCells(swappedCells);

      setMixCount((prev) => {
        if (!prev) return 0;
        return prev - 1;
      });
      setMoveCount(0);
    }
  }

  const swapCellsByDirection = (direction: DirectionStrings): void => {
    const index = findMovingCellIndex(cells, direction);

    if (isNumber(index)) {
      const swappedCells = swapCells(cells, index);

      setCells(swappedCells);
      setMoveCount(moveCount + 1);
      setIsWon(hasEveryCellCorrectPosition(swappedCells));
    }
  };

  const handleCellClick = (index: number) => (): void => {
    if (isMix) return;

    const swappedCells = swapCells(cells, index);

    setCells(swappedCells);
    setMoveCount(moveCount + 1);
    setIsWon(hasEveryCellCorrectPosition(swappedCells));
  };

  const handleArrowClick = (direction: DirectionStrings) => (): void => {
    if (isMix) return;

    swapCellsByDirection(direction);
  };

  const handleButtonClick = (): void => {
    if (isWon) setIsWon(false);
    startMix();
  };

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
