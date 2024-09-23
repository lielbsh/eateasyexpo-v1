import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'; 



const DeleteButton = ({handlePress,contaniorstyles,color,activeOpacity,size}) => {
  return (
    <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={handlePress}
        className={contaniorstyles}>
        <AntDesign name="closecircle" size={size} color={color} />
    </TouchableOpacity>
  )
}

export default DeleteButton