import {useEffect, useState} from 'preact/hooks';

export function useClassOnMount(activeClass: string): string | undefined {
  const [className, setClassName] = useState<string | undefined>();

  useEffect(() => {
    setClassName(activeClass);
  }, []);

  return className;
}
