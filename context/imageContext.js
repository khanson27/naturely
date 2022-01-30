import { createContext, useState } from "react";
import { Dimensions } from "react-native";
export const ImageContext = createContext();
const { width, height } = Dimensions.get("window");

export const ImageProvider = ({ children }) => {
  const [img, setImg] = useState({
    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png",
    width: "100%",
    height: width > 700 ? 700 : width,
  });
  return (
    <ImageContext.Provider value={{ img, setImg }}>
      {children}
    </ImageContext.Provider>
  );
};
