import { useStore } from "../store/useStore";

export const useMoveCount = () => {
  const { moveCount, setMoveCount } = useStore();

  const increaseMoveCount = () => setMoveCount(moveCount + 1);

  const resetMoveCount = () => setMoveCount(0);

  return {
    moveCount,
    increaseMoveCount,
    resetMoveCount,
  };
};
