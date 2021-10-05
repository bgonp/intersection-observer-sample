import useVisibleListener from "./useVisibleListener";
import useFetchCosas from "./useFetchCosas";

import "./styles.css";
import { useCallback } from "react";

export default function App() {
  const { isLoading, fetchCosas, cosas } = useFetchCosas();
  const visibleCallback = useCallback(() => {
    if (isLoading) return;
    fetchCosas();
  }, [isLoading, fetchCosas]);
  const { parentRef, childRef } = useVisibleListener(visibleCallback);

  return (
    <div className="App">
      <ul ref={parentRef}>
        {cosas.map((cosa, i) => {
          if (i < cosas.length - 1) return <li key={i}>{cosa}</li>;
          return (
            <li key={i} ref={childRef}>
              {cosa}
            </li>
          );
        })}
        {isLoading && <li>Loading...</li>}
      </ul>
    </div>
  );
}
