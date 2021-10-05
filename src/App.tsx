import useInfiniteScroll from "./useInfiniteScroll";

import "./styles.css";

const ELEMS = 100;

const getRandomString = () => Math.random().toString(36).split(".")[1];

export default function App() {
  const { parentRef, childRef } = useInfiniteScroll(() =>
    console.log("triggered")
  );

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ul ref={parentRef}>
        {[...Array(ELEMS)].map((_, i) => {
          if (i < ELEMS - 1) return <li key={i}>{getRandomString()}</li>;
          return (
            <li key={i} ref={childRef}>
              {getRandomString()}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
