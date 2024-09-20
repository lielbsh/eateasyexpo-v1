import { View, Text, ScrollView, Alert, Image } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { ImageBackground } from "react-native-web";

const NewPassword = () => {
  const [form, setForm]  = useState({
    password1: '',
    password2: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.password2 === "" || form.password1 === "") {
      Alert.alert("Oops!", "Please fill in all fields");
    }else if((form.password1 =!form.password2)){
    } else {
      Alert.alert("Oops!", "Passwords don't match")
      // Handle sign-up logic
    }
  };

  return (
    
    <SafeAreaView className="bg-background-red h-full">
      <View className="flex-row h-[80px] mt-[30px] ml-[20px]">
          <Text className="color-offwhite text-5xl font-bold mt-[20px] text-primary">Eat</Text>
          <Text className="color-offwhite underline-[2px] text-5xl font-bold font-cursive leading-[80px]">Easy</Text>
          <Image source={require('../../assets/images/logo1.png')}  className="w-[50px] h-[50px] mt-[20px]" />
        </View>
        
      <ScrollView className=" h-[800px] " style={{ zIndex: 0 }}>
        <View className="w-full flex justify-center h-full px-4  m-[px] mt-[40px]">
          <View className="">
          <Text className="text-3xl font-semibold text-burgundy mt-10 font-psemibold">
            Set Password 
          </Text>
          </View>
          

          <FormField
            title="Password"
            value={form.password1}
            handleChangeText={(e) => setForm({ ...form, password1: e })}
            otherStyles="mt-7"
            secureTextEntry
            othercontainorStyles="bg-background-beige border-burgundy opacity-[0.7]"
          />
          <FormField
            title="Password Again"
            value={form.password2}
            handleChangeText={(e) => setForm({ ...form, password2: e })}
            otherStyles="mt-7"
            secureTextEntry
            othercontainorStyles="bg-background-beige border-burgundy opacity-[0.7]"
          />

          {/* Sign Up Button */}
          <View className="items-center">
            <CustomButton
              title="Set Password"
              handlePress={submit}
              isLoading={isSubmitting}
              textStyles="text-[16px] color-burgundy"
                containerStyles="mt-[20px] items-center w-[150px] border  border-burgundy border-2 bg-background-beige h-[50px]"
            />
          </View>

          {/* Already have an account */}
          
        </View>
      </ScrollView>
      <Image source={require('../../assets/images/background.png')}  className="absolute w-[500px] h-[500px] top-[450px] left-[50px]" style={{ opacity: 0.5, zIndex: -1 }}
      />
      </SafeAreaView>
  );
}

export default NewPassword ;
