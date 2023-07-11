import { createContext, useState, useEffect } from "react";

export const AdjustmentContext = createContext({});

export function AdjustmentContextProvider({ children }) {
  const [adjustment, setAdjustment] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/adjustment")
      .then((res) => {
        return res.json();
      })
      .then((result) => setAdjustment(result));
  }, []);

  return (
    <AdjustmentContext.Provider value={{ adjustment, setAdjustment }}>
      {children}
    </AdjustmentContext.Provider>
  );
}
