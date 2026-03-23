import { createContext, useContext, useEffect, useState } from "react";

const TimerContext = createContext(0);

export function TimerProvider({ children }) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContext.Provider value={secondsElapsed}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  return useContext(TimerContext);
}
