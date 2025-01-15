import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto para los precios de los Cedears
const CedearContext = createContext();

// Hook para acceder al contexto
export const useCedear = () => {
  return useContext(CedearContext);
};

// Proveedor del contexto
export const CedearProvider = ({ children }) => {
  const [cedearPrices, setCedearPrices] = useState([]); // [{},{}]?

  return (
    <CedearContext.Provider value={{ cedearPrices, setCedearPrices }}>
      {children}
    </CedearContext.Provider>
  );
};
