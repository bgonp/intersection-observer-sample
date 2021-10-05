import useVisibleListener from "./useVisibleListener";

import "./styles.css";
import { useState } from "react";

const ELEMS = 100;

const getRandomString = () => Math.random().toString(36).split(".")[1];

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { parentRef, childRef } = useVisibleListener(() => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
    console.log("triggered", isLoading);
  });

  return (
    <div className="App">
      <ul ref={parentRef}>
        {[...Array(ELEMS)].map((_, i) => {
          if (i < ELEMS - 1) return <li key={i}>{getRandomString()}</li>;
          return (
            <li key={i} ref={childRef}>
              {getRandomString()}
            </li>
          );
        })}
        {isLoading && <li>Loading...</li>}
      </ul>
    </div>
  );
}
