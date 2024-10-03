import { View, Modal, Image } from "react-native";
import React from "react";

const LoadingModalSpiral = ({ _visible, _opacity }) => {
  return (
    <Modal visible={_visible} transparent={true} animationType="fade">
      <View
        className="flex-1 justify-center items-center bg-background-offwhite"
        style={{ backgroundColor: `rgba(255, 255, 255, ${_opacity})` ,zIndex:20}} // Dynamic opacity applied here
      >
        <Image
          source={require("../../assets/images/loading.gif")} // Loading spinner image
          className="w-[40px] h-[40px]"
        />
      </View>
    </Modal>
  );
};

export default LoadingModalSpiral;
