import React, { useEffect, useRef ,useState} from 'react';
import { View, Animated, Easing,Text,Image } from 'react-native';
import { useDataGuard } from '../data/globaldata';
import { router } from 'expo-router';
const LoadinComponent = ({setReload}) => {
  const { user,updateData,resetData } = useDataGuard();
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedRadius = useRef(new Animated.Value(60)).current;
  const animatedRadius2 = useRef(new Animated.Value(50)).current;
  const animatedArrow = useRef(new Animated.Value(0)).current;
  const duration = 1000;
  
  useEffect(() => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const animateRadius = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedRadius, {
            toValue: 100,
            duration: duration / 2,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(animatedRadius, {
            toValue: 60,
            duration: duration / 2,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }),
        ]),
        { iterations: -1 }
      ).start();
    };

    const animateRadius2 = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedRadius2, {
            toValue: 0,
            duration: duration / 2,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }),
          Animated.timing(animatedRadius2, {
            toValue: 70,
            duration: duration / 2,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
          }),
        ]),
        { iterations: -1 }
      ).start();
    };

    animateRadius();
    animateRadius2();

    // After 5 seconds, expand both circles
    
  }, [duration]);
  useEffect(() => {
    if (user.username){
      Animated.timing(animatedRadius2, {
        toValue: 1000, // or a value larger than the screen width/height
        duration: 1000,
        useNativeDriver: false,
      }).start();
      Animated.timing(animatedArrow, {
        toValue: 150,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      const expandCircles = setTimeout(() => {
        setReload(false)
        router.push('/home')
        
      }, 1000);
    
    

    return () => {
      clearTimeout(expandCircles);
       // Stop ongoing animations
    };
    }
    
  }, [user])
  
  return (
    <Animated.View 
      className="absolute w-[100%] h-[100%] bg-red top-[-50px] left-0 z-20 items-center justify-center"
      style={{ opacity: animatedOpacity }}
    >
      <View className="mt-[100px] w-[100px] h-[100px] rounded-full bg-background-beige items-center justify-center">
        <Animated.View 
          className="rounded-full items-center justify-center"
          style={{ 
            height: animatedRadius, 
            width: animatedRadius, 
            backgroundColor: 'rgba(255, 80, 43, 0.5)' 
          }}
        >
          <Animated.View 
            className="rounded-full bg-background-beige items-center justify-center" 
            style={{ height: animatedRadius2, width: animatedRadius2 }} 
          />
        </Animated.View>
      </View>
      <View className='absolute w-[100%] h-[100%] top-0 left-0 justify-center items-end'>
      </View>
      
    </Animated.View>
  );
};

export default LoadinComponent;
