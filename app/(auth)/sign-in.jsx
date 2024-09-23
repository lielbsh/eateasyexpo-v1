import { View, Text, ScrollView, Alert, Image } from "react-native";
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from "expo-router";
import { images } from "../../constants"
import FormField from "../../components/custom/FormField";
import CustomButton from "../../components/custom/CustomButton";
import {sighInReq} from "../../scripts/regesterScript/sign-in.js"
import { useDataGuard } from '../../components/data/globaldata.jsx';
import LoadinComponent from "../../components/custom/loadingComponent"


const SignIn = () => {
  const [reload,setReload]=useState(false)
  const { user,updateData,resetData } = useDataGuard();
  const [form, setForm]  = useState({
    username: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    setIsSubmitting(true)
    if (form.username === "" || form.password === "") {
      Alert.alert("Oops!", "Please fill in all fields");
    } else {
      const result= await sighInReq(form,updateData)
      if (result == 'login sucessful. Retrieving your data') {
          setReload(true)
          setTimeout(() => {
            router.replace('/home');
            
        }, 4490)
      } else {
        setReload(true)
          setTimeout(() => {
            router.replace('/home');
            
        }, 4490)
        
    }
    }
  };
  const othercontainorStyles="bg-background-beige border-burgundy opacity-[0.7] rounded-md p-3 text-background-red flex flex-row items-center rounded-full border border-2"
  return (
    
    <SafeAreaView className="bg-background-red h-full" >
      <View className="flex-row h-[80px] mt-[30px] ml-[20px]">
          <Text className="color-offwhite text-5xl font-bold mt-[20px] text-primary">Eat</Text>
          <Text className="color-offwhite underline-[2px] text-5xl font-bold font-cursive leading-[80px]">Easy</Text>
          <Image source={require('../../assets/images/logo1.png')}  className="w-[50px] h-[50px] mt-[20px]" />
        </View>
        
      <ScrollView className=" h-[800px] " style={{ zIndex: 0 }}>
        <View className="w-full flex justify-center h-full px-4  m-[px] mt-[40px]">
          <View className="">
          <Text className="text-3xl font-semibold text-burgundy mt-10 font-psemibold">
            Sign In
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
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            secureTextEntry
            othercontainorStyles={othercontainorStyles}
          />
          <View className="items-end">
          <View className="  flex-row mt-4">
            <Text className="text-sm text-beige font-plight">Forgot password?  </Text>
            <Link href="/sign-up" className="text-sm font-psemibold text-beige underline">Reset</Link>
          </View>
          </View>

          {/* Sign Up Button */}
          <View className="items-center">
            <CustomButton
              title="Sign In"
              handlePress={submit}
              isLoading={isSubmitting}
              textStyles="text-[16px] color-burgundy"
              containerStyles="mt-[20px] items-center w-[100px] border  border-burgundy border-2 bg-background-beige h-[50px]"
            />
          </View>

          {/* Already have an account */}
          <View className="items-center">
          <View className="  flex-row mt-4">
            <Text className="text-sm text-beige font-plight">Don't have an account?  </Text>
            <Link href="/sign-up" className="text-sm font-psemibold text-beige underline">Sign Up</Link>
          </View>
          </View>
          
        </View>
      </ScrollView>
      <Image source={require('../../assets/images/background.png')}  className="absolute w-[500px] h-[500px] top-[450px] left-[50px]" style={{ opacity: 0.5, zIndex: -1 }}
      />
      
      {(reload) && (<LoadinComponent></LoadinComponent>)}
      
      
      </SafeAreaView>
  );
}

export default SignIn;
