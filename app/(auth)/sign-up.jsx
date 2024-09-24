import { View, Text, ScrollView, Alert, Image,TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, Redirect, router } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/custom/FormField";
import CustomButton from "../../components/custom/CustomButton";
import { Button, ImageBackground } from "react-native-web";
import { useNavigationGuard } from "../../components/navigation/navigationGuard";
import {signUpReq} from "../../scripts/regesterScript/sign-up"
import { useDataGuard } from '../../components/data/globaldata.jsx';



const SignUp = () => {
  const { user,updateData,resetData } = useDataGuard();
  const { access,allowAccess } = useNavigationGuard();
  

  const [form, setForm]  = useState({
    username: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async () => {
    setIsSubmitting(true)
    if (form.username === "" || form.email === "" ) {
      Alert.alert("Oops!", "Please fill in all fields");
      
    } else {
      const result= await signUpReq(form,updateData)
      setMessage(result)
      if (result=='Contuning to verify email.'){
        allowAccess("canAccessVerify")
        updateData("username",form.username)
        updateData("email",form.email)
        updateData("action","create user")
        setTimeout(() => {
          router.push('/verify');
          
        }, 2000)
      }else{
        setTimeout(() => {
          setIsSubmitting(false)
          setMessage("")
        }, 2000)
        
      }     
    }
  };
  const othercontainorStyles="bg-background-beige border-burgundy opacity-[0.7] rounded-md p-3 text-background-red flex flex-row items-center rounded-full border border-2"
  return (
    
    <SafeAreaView className="bg-background-red h-full">
      <View className="flex-row h-[80px] mt-[30px] ml-[20px]">
          <Text className="color-offwhite text-5xl font-bold mt-[20px] text-primary">Eat</Text>
          <Text className="color-offwhite underline-[2px] text-5xl font-bold font-cursive leading-[80px]">Easy</Text>
          <Image source={require('../../assets/images/logo1.png')}  className="w-[50px] h-[50px] mt-[20px]" />
        </View>
        
      <ScrollView className=" flex-1 h-[800px] " style={{ zIndex: 0 }}>
        <View className="w-full flex justify-center h-full px-4  m-[px] mt-[0px]">
          <View className="">
          <Text className="text-3xl font-semibold text-burgundy mt-10 font-psemibold">
            Sign Up
          </Text>
          </View>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            othercontainorStyles={othercontainorStyles}
          />
          
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7 "
            keyboardType="email-address"
            othercontainorStyles={othercontainorStyles}
          />

          

          {/* Sign Up Button */}
          <View className="items-center">
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              isLoading={isSubmitting}
              textStyles="text-[16px] color-burgundy"
                containerStyles="mt-[20px] items-center w-[100px] border  border-burgundy border-2 bg-background-beige h-[50px]"
            />
          </View>

          {/* Already have an account */}
          <View className="items-center">
          <View className="  flex-row mt-4">
            <Text className="text-sm text-gray-200 font-plight">Already have an account?  </Text>
            <Link href="/sign-in" className="text-sm font-psemibold text-white">Sign in</Link>
          </View>
        </View>
        </View>
        <View className="items-center mt-[30px]">
          <Text className="text-sm font-psemibold text-white">
            {message}
          </Text >
        </View>
      </ScrollView>
      <Image source={require('../../assets/images/background.png')}  className="absolute w-[500px] h-[500px] top-[450px] left-[50px]" style={{ opacity: 0.5, zIndex: -1 }}
      />
      </SafeAreaView>
  );
}

export default SignUp;
