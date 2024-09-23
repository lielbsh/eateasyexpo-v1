import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const Header = ({color}) => {
  return (
    <TouchableOpacity onPress={() => router.push('/home')}> 
      <View className="flex-row h-[60px] mt-[20px] ml-[20px]">
          <Text className=" text-3xl font-bold text-primary" style={{color:color}}>Eat</Text>
          <Text className="underline-[2px] text-3xl font-bold font-cursive leading-[42px]" style={{color:color}}>Easy</Text>
          <Image source={require('../../assets/images/logo2.png')} className="w-[45px] h-[45px] mt-[-4px]"style={{tintColor:color}} />
      </View>
    </TouchableOpacity>
  )
}

export default Header