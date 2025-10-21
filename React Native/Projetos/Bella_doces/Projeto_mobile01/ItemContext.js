import React, { createContext, useState } from 'react';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [itens, setItens] = useState([]);

  return (
    <ItemContext.Provider value={{ itens, setItens }}>
      {children}
    </ItemContext.Provider>
  );
};
