import { createContext, useState } from "react";

export const TopicContext = createContext();

export const TopicProvider = ({ children }) => {
  const [topics, setTopics] = useState([
    "dog",
    "cat",
    "wolf",
    "tree",
    "flower",
    "rose",
    "leaf",
    "carrot",
    "I-dont-know",
    "pufff",
    "apple",
    "seed",
    "well",
  ]);

  return (
    <TopicContext.Provider value={{ topics, setTopics }}>
      {children}
    </TopicContext.Provider>
  );
};
