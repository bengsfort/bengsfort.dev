import {useEffect, useState} from 'preact/hooks';

interface HookProps {
  typeSpeed?: number;
  deleteSpeed?: number;
}

interface HookResult {
  currentText: string;
  currentTextTarget: string;
  typeText: (text: string) => void;
  deleteText: () => void;
}

const DEFAULT_TYPE_SPEED = 64;
const DEFAULT_DELETE_SPEED = 24;

export function useTypeTransition({
  typeSpeed = DEFAULT_TYPE_SPEED,
  deleteSpeed = DEFAULT_DELETE_SPEED,
}: HookProps): HookResult {
  const [target, setTarget] = useState(``);
  const [currentText, setCurrentText] = useState(``);

  useEffect(() => {
    if (currentText === target)
      return;

    const shouldDelete = target.length === 0;

    const timeout = setTimeout(() => {
      const nextText = shouldDelete
        ? currentText.slice(0, -1)
        : currentText + target[currentText.length];

      setCurrentText(nextText);
    }, shouldDelete ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, target, typeSpeed, deleteSpeed]);

  const typeText = (text: string) => {
    setTarget(text);
  };

  const deleteText = () => {
    setTarget(``);
  };

  return {
    currentText,
    currentTextTarget: target,
    typeText,
    deleteText,
  };
}
