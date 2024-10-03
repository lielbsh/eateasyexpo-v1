import React from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

const FloatingActionButton = ({ animatedStyle, onPress ,backgroundColor}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[animatedStyle, { backgroundColor: backgroundColor, borderRadius: 50, padding: 10 }]}>
        <Feather name="plus" size={24} color="#FFFFFF" />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
