import React, { useEffect, useState } from "react";
import axios from "axios";

const Translate = ({ children }: any) => {
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const translate = async () => {
      try {
        const { data } = await axios.post(
          `https://translation.googleapis.com/language/translate/v2?key=AIzaSyA0PAo6ZEL_EW6o1TrcCSKOccWWxUHiw9M`,
          {
            q: children,
            target: localStorage.getItem("lang"),
          }
        );

        setTranslatedText(data.data.translations[0].translatedText);
      } catch (error) {
        console.error("Failed to translate text:", error);
      }
    };

    if (children && !(localStorage.getItem("lang") === "en")) {
      translate();
    }
  }, [children]);
  return <>{translatedText ? translatedText : children}</>;
};

export default Translate;
