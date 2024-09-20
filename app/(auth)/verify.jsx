import { View, Text, ScrollView, Alert, Image } from "react-native";
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from "expo-router";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { ImageBackground } from "react-native-web";
import { useNavigationGuard } from '../../components/navigation/navigationGuard'; 
const Verify = () => {
    const { access } = useNavigationGuard();
    const [form, setForm]  = useState({
        password: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if ( form.password === "") {
        Alert.alert("Oops!", "Please fill in all fields");
        } else {
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
            
            {access.canAccessVerify && (<ScrollView className=" h-[800px] " style={{ zIndex: 0 }}>
            <View className="w-full flex justify-center h-full px-4  m-[px] mt-[40px]">
            <View className="">
            <Text className="text-3xl font-semibold text-burgundy mt-10 font-psemibold">
                Verify your account 
            </Text>
            </View>
            

            <FormField
                title="with code sent to your mail:"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="mt-7"
                secureTextEntry
                othercontainorStyles="bg-background-beige border-burgundy opacity-[0.7]"
            />

            {/* Sign Up Button */}
            <View className="items-center">
                <CustomButton
                title="Verify"
                handlePress={submit}
                isLoading={isSubmitting}
                textStyles="text-[16px] color-burgundy"
                    containerStyles="mt-[20px] items-center w-[100px] border  border-burgundy border-2 bg-background-beige h-[50px]"
                />
            </View>

            {/* Already have an account */}
            <View className="items-center">
            <View className="  flex-row mt-4">
                <Text className="text-sm text-gray-200 font-plight">Didn't get the mail?  </Text>
                <Link href="/sign-up" className="text-sm font-psemibold text-white">back to Sign Up</Link>
            </View>
            </View>
            </View>
        </ScrollView>)}
        {!(access.canAccessVerify) && (
            <View>
            <Text>Error</Text>
            </View>
        )}
        <Image source={require('../../assets/images/background.png')}  className="absolute w-[500px] h-[500px] top-[450px] left-[50px]" style={{ opacity: 0.5, zIndex: -1 }}
        />
        </SafeAreaView>
    );
    }

export default Verify;
