import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

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
          <Text className="color-gray">{dots}</Text> {/* Dots are animated */}
        </Text>
      </View>
      <Text className="text-[16px] font-bold color-red mt-[10px]">
        Hold tight, good things take time!
      </Text>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Image
          source={require("../../assets/images/loading.gif")} // Loading spinner image
          className="w-[40px] h-[40px]"
        />
      </View>
    </>
  );
};

export default LoadingDots;
