import {React, useState} from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";
import {searchScript} from "../scripts/puppeteer/searchScript"
import StartComponent from "../components/custom/startComponent"


export default function Index() {
  const [initialpage,setinItialPage]=useState(true)
  
  

  

  return (
    <SafeAreaView className="bg-background-red h-full">
       <StartComponent initialpage={initialpage}></StartComponent> 
      <View className="flex-1 justify-center items-center px-4" >

        {/* App Logo */}
        
        <View className="flex-row h-[80px] mb-2 ">
          <Text className="color-beige text-2xl font-bold text-primary mt-8 ">Welcome to </Text>
          <Text className="color-offwhite text-5xl font-bold mt-[20px] text-primary">Eat</Text>
          <Text className="color-offwhite underline-[2px] text-5xl font-pbold leading-[80px]" style={{fontFamily:'Pacifico_400Regular'}}>Easy</Text>
          <Image source={require('../assets/images/logo1.png')}  className="w-[50px] h-[50px] mt-[20px]" />
        </View>

        {/* Title or Tagline */}
        
        <Image source={require('../assets/images/mainpaige.png')}  className="w-[400px] h-[350px]" />

        

        {/* Register Button */}
        <TouchableOpacity
          className="bg-primary mt-8 px-6 py-3 rounded-full border border-burgundy border-2 bg-background-beige"
          onPress={() => searchScript({stringInput:"vanilla cake"})} // Navigate to register screen
        >
          <Text className="color-burgundy font-bold text-lg">Create Account</Text>
        </TouchableOpacity>

        {/* Already have an account? */}
        <TouchableOpacity
          className="mt-4"
          // onPress={() => router.push("/sign-in")}
          onPress={() => {
            router.push('/sign-in');
          }} // Navigate to login screen
        >
          <View className="flex-row">
          <Text className="color-burgundy text-primary text-base">Already have an account? </Text>
          <Text className="color-burgundy text-primary text-base font-bold underline">
            Log in
          </Text>
          </View>
        </TouchableOpacity>

      </View>
      <StatusBar backgroundColor="#161622" style="light" />
      
    </SafeAreaView>
  );
}