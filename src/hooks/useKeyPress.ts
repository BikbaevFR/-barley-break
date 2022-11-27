import { useEffect, useState } from "react";
import { DirectionStrings } from "../types";

const getPressedArrow = (key: string): DirectionStrings | null => {
  if (!key.startsWith("Arrow")) return null;

  return key.replace("Arrow", "") as DirectionStrings;
};

export const useKeyPress = (): DirectionStrings | null => {
  const [pressedKey, setPressedKey] = useState<DirectionStrings | null>(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleKeyDown = (e: KeyboardEvent): void =>
    setPressedKey(getPressedArrow(e.key));

  const handleKeyUp = (): void => setPressedKey(null);

  return pressedKey;
};
