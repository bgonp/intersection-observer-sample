import { useEffect, useRef } from "react";

const TRESHOLD = 0;

const useVisibleListener = (
  callback: () => void,
  marginPercentage: number = 0
) => {
  const parentRef = useRef<HTMLUListElement>(null);
  const childRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!parentRef.current || !childRef.current) return;
    const options = {
      root: parentRef.current,
      rootMargin: `${marginPercentage}%`,
      treshold: TRESHOLD
    };
    const triggeredAction = ([entry]: IntersectionObserverEntry[]) =>
      entry.isIntersecting && callback();
    const observer = new IntersectionObserver(triggeredAction, options);

    observer.observe(childRef.current);

    return () => observer.disconnect();
  }, [callback, marginPercentage]);

  return { parentRef, childRef };
};

export default useVisibleListener;
