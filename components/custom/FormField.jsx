import { TextInput, View, Text, Image } from 'react-native';
import React from 'react'
import { useState } from "react";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { icons } from "../../constants";

const FormField = ({type, title, value, handleChangeText, otherStyles, keyboardType, secureTextEntry ,colors,othercontainorStyles,placeholder}) => {
    
    const [showPassword, setShowPassword] = useState(false); 
        let string=` ${othercontainorStyles}`
    return (
    <View className={`w-full ${otherStyles}`}> 
        {(title && type!="no title")&& 
            (<Text className="text-white font-psemibold mb-2 text-[16px]">{title}</Text>)
        }
        
        <View className={string}>
            <TextInput
                placeholder={placeholder}
                style={{ flex: 1, fontFamily: 'Poppins-Regular',  }}
                value={value}
                onChangeText={handleChangeText}
                keyboardType={keyboardType}
                secureTextEntry={(title === "Password"||title === "Password Again") && !showPassword}
                placeholderTextColor="#999"
            />
            {(type=="Password" ||title === "Password" ) && (
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