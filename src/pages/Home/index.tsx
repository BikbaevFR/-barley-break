import isNumber from "lodash/isNumber";
import { FC, useEffect, useRef, useState } from "react";

import Box from "../../components/Box";
import Button from "../../components/Button";
import Title from "../../components/Title";
import Wrapper from "../../layouts/Wrapper";

import { MIX_COUNT, OPPOSITE_DIRECTION } from "../../constants";
import {
  findMovingCellIndex,
  hasEveryCellCorrectPosition,
  swapCells,
} from "../../utils";
import { getRandomDirection } from "../../utils/direction";

import { DirectionStrings, ICell } from "../../types";

import { useStore } from "../../store/useStore";
import styles from "./styles.module.scss";

const Home: FC = () => {
  const { cells, setCells, moveCount, setMoveCount } = useStore();

  const [mixCount, setMixCount] = useState<number>(0);
  const [excludedDirection, setExcludedDirection] =
    useState<DirectionStrings | null>(null);
  const [isWon, setIsWon] = useState<boolean>(false);

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMix = !!mixCount;

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cells]);

  useEffect(() => {
    if (mixCount) {
      timerId.current = setTimeout(mix, 300);
    }

    if (!mixCount && timerId.current) {
      timerId.current = null;
    }
  }, [mixCount]);

  const handleCellClick = (index: number) => (): void => {
    if (isMix) return;

    const swappedCells = swapCells(cells, index);

    setCells(swappedCells);
    setMoveCount(moveCount + 1);
    setIsWon(hasEveryCellCorrectPosition(swappedCells));
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (isMix) return;

    const key = e.key;

    if (!key.startsWith("Arrow")) return;

    const direction = key.replace("Arrow", "") as DirectionStrings;

    const index = findMovingCellIndex(cells, direction);

    if (isNumber(index)) {
      const swappedCells = swapCells(cells, index);

      setCells(swappedCells);
      setMoveCount(moveCount + 1);
      setIsWon(hasEveryCellCorrectPosition(swappedCells));
    }
  };

  const handleButtonClick = (): void => {
    if (isWon) setIsWon(false);

    mix();
    setMixCount(MIX_COUNT);
  };

  const mix = () => {
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

      timerId.current && clearTimeout(timerId.current);
      setMixCount((prev) => prev - 1);
      setMoveCount(0);
    }
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
        />
        <Button onClick={handleButtonClick} isDisabled={!!mixCount} />
      </Wrapper>
    </section>
  );
};

export default Home;
