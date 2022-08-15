import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  const [result, setResult] = useState({});
  return (
    <Context.Provider value={{ result, setResult }}>
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
