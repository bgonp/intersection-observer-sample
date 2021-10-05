import { useCallback, useMemo, useRef } from "react";

const THRESHOLD = 0;

type VisibilityRef = {
  parent: Element | null;
  child: Element | null;
  observer: IntersectionObserver | null;
};

const useVisibleListener = (
  callback: () => void,
  marginPercentage: number = 0
) => {
  const elementsRef = useRef<VisibilityRef>({
    parent: null,
    child: null,
    observer: null
  });

  const observe = useCallback(() => {
    const { parent, child, observer } = elementsRef.current;

    if (observer) observer.disconnect();

    if (!parent || !child) return;

    const options = {
      root: parent,
      rootMargin: `${marginPercentage}%`,
      threshold: THRESHOLD
    };

    const triggeredAction = ([entry]: IntersectionObserverEntry[]) =>
      entry.isIntersecting && callback();

    const nextObserver = new IntersectionObserver(triggeredAction, options);
    nextObserver.observe(child);

    elementsRef.current = { parent, child, observer: nextObserver };
  }, [callback, marginPercentage]);

  const getRef = useCallback(
    (key: "parent" | "child") => (element: Element | null) => {
      if (element === elementsRef.current[key]) return;
      elementsRef.current = { ...elementsRef.current, [key]: element };
      observe();
    },
    [observe]
  );

  const visibiltyRefs = useMemo(
    () => ({
      parentRef: getRef("parent"),
      childRef: getRef("child")
    }),
    [getRef]
  );

  return visibiltyRefs;
};

export default useVisibleListener;
