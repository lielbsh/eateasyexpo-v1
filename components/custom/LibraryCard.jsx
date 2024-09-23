import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const LibraryCard = ({item,inpurtext}) => {
  let classname=`w-[100%] h-[100%] items-center ${inpurtext}`
  return (
    <TouchableOpacity activeOpacity={0.7} className={classname} onPress={() => router.push("/home")}>
              
              <View style={{width: "90%",height: "70%",top: "25%", }}>
                <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', borderRadius:'10px' }} />
              </View>
              <View className="absolute bottom-[5%] w-[90%] bg-black/50 py-2 px-4 rounded-bl-[10px] rounded-br-[10px] items-center max-h-[50%]">
                <Text className="text-[15px] font-psemibold text-white shadow-md">
                    {item.name}
                </Text>
              </View>
                
            </TouchableOpacity>
  )
}

export default LibraryCard