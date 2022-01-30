import { createContext, useState } from "react";

export const PositionContext = createContext();

export const PositionProvider = ({ children }) => {
  const [postLocation, setPostLocation] = useState(false);
  const [postLocationName, setPostLocationName] = useState(false);

  return (
    <PositionContext.Provider
      value={{
        postLocation,
        setPostLocation,
        postLocationName,
        setPostLocationName,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
};
