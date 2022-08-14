import React, { useState, useEffect } from "react";

const Context = React.createContext();

function ContextProvider({ children }) {
  return <ContextProvider>{children}</ContextProvider>;
}

export { ContextProvider, Context };
