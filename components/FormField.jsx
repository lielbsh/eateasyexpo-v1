import { TextInput, View, Text, Image } from 'react-native';
import React from 'react'
import { useState } from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from "../constants";

const FormField = ({ title, value, handleChangeText, otherStyles, keyboardType, secureTextEntry ,colors,othercontainorStyles}) => {
    
    const [showPassword, setShowPassword] = useState(false); 
        let string=` rounded-md p-3 text-background-red flex flex-row items-center rounded-full border border-2 ${othercontainorStyles}`
    return (
    <View className={`w-full ${otherStyles}`}> 
        <Text className="text-white font-psemibold mb-2 text-[16px]">{title}</Text>
        <View className={string}>
            <TextInput
                style={{ flex: 1, fontFamily: 'Poppins-Regular',  }}
                value={value}
                onChangeText={handleChangeText}
                keyboardType={keyboardType}
                secureTextEntry={(title === "Password"||title === "Password Again") && !showPassword}
                // className="border border-gray-300 p-2 rounded"
            />
            {(title === "Password"|| title === "Password Again") && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                    source={!showPassword ? icons.eyeHide : icons.eye}
                    className="w-6 h-6"
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                )}
            
        </View>
    </View>
  )
}

export default FormField