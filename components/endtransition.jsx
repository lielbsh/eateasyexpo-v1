import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';

const FadeOutComponent = () => {
  const animatedOpacity = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    
    // After 5.5 seconds, fade out the beige circle
    const fadeOutCircle = setTimeout(() => {
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true, // Changed to true for better performance
      }).start();
    }, 500);

    return () => {
      
      clearTimeout(fadeOutCircle);
      
      
    };
  }, [1500]);

  return (
    <Animated.View 
      className="absolute w-[100%] h-[100%] bg-beige top-[0px] left-0 z-20 items-center justify-center"
      style={{ opacity: animatedOpacity }}
    >
      
    </Animated.View>
  );
};

export default FadeOutComponent;
