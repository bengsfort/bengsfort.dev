import { useEffect, useRef, useState } from "preact/hooks";

interface HookProps {
  text: string;
  delay: number;
  duration: number;
  onFinished: () => void;
}
export function useTypeTransition({ text, delay, duration, onFinished }: HookProps): string {
  const [textState, setTextState] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setTextState('');
    setIsFinished(false);
  }, [text]);

  useEffect(() => {
    if (isFinished) {
      onFinished();
    }
  }, [isFinished]);

  useEffect(() => {
    const timeoutDuration = textState.length === 0 ? delay : duration / text.length;

    const timeout = setTimeout(() => {
      if (textState.length < text.length) {
        setTextState(text.slice(0, textState.length + 1));
      } else {
        setIsFinished(true);
      }
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [textState]);

  return textState;
}
