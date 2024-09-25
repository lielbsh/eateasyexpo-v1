import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const LibraryCard = ({item, inputText, handelPress}) => {
  let classname=`w-[100%] h-[100%] items-center ${inputText}`
  return (
    <TouchableOpacity 
      style={{borderRadius:10}} 
      activeOpacity={0.7} 
      className={classname} 
      onPress={handelPress}
      > 
      <View style={{width: "90%",height: "70%",top: "25%", }}>
        <Image source={{ uri: item.image }} style={{ width: '100%', height: '100%', borderRadius:10 }} />
      </View>
      <View className="absolute bottom-[5%] w-[90%] bg-black/50 py-2 px-4 items-center max-h-[50%]"
      style={{borderBottomLeftRadius:10, borderBottomRightRadius:10}}
      >
        <Text className="text-[15px] font-psemibold text-white shadow-md">
            {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default LibraryCard