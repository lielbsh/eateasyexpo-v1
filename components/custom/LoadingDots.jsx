import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const LoadingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500); // Update the dots every 500ms

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return (
    <>
      <View style={{ flexDirection: "row", marginTop: "20%" }}>
        <Text className="color-gray-600 text-[18px] font-medium">
          We’re gathering delicious recipes
          <Text className="color-gray-600">{dots}</Text>{" "}
          {/* Dots are animated */}
        </Text>
      </View>
      <Text className="text-[16px] font-bold mt-[10px]">
        Hold tight, good things take time!
      </Text>
    </>
  );
};

export default LoadingDots;
