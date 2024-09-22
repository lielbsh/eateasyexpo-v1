import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 

const deleteButton = ({handlePress}) => {
  return (
    <TouchableOpacity
        onPress={() => handlePress}
        className="absolute top-2 right-[20%] p-1.5">
        <AntDesign name="closecircle" size={24} color="white" />
    </TouchableOpacity>
  )
}

export default deleteButton