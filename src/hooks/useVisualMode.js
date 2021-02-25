import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const newHistory = [...history];

  const transition = function (newMode, replace = false) {
    if (replace) {
      newHistory.pop();
    }
    newHistory.push(newMode);
    setHistory(() => [...newHistory]);
    setMode(newMode);
    return;
  };

  const back = function () {
    if (newHistory.length > 1) {
      newHistory.pop();
      setHistory(() => [...newHistory]);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
}
