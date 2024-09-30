import { View, Text, ScrollView, Alert, Image } from "react-native";
import React, { useState ,useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from "expo-router";
import FormField from "../../components/custom/FormField";
import CustomButton from "../../components/custom/CustomButton";
import {VerifyCodeReq,SetAccountReq} from "../../scripts/regesterScript/verify"
import { useNavigationGuard } from '../../components/navigation/navigationGuard'; 
import { useDataGuard } from '../../components/data/globaldata.jsx';


const Verify = () => {
    //use state for this page
    const [message, setMessage] = useState("");
    const { user,updateData,resetData } = useDataGuard();
    const { access ,resetAccess} = useNavigationGuard();
    const [verifyorpaswword, setVerifyorPaswword]  = useState("verify")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm]  = useState({
        verifycode: '',
        password1:'',
        password2:''
    });
    
    //only 7 minutes to stay on page
    const timeoutDuration = 7 * 60 * 1000; // 5 minutes
    const timeoutId = setTimeout(() => {
        resetAccess()
        router.push("/")
    }, timeoutDuration);

    

    const submit = async () => {
        setIsSubmitting(true)
        //verify code conditions form
        if (verifyorpaswword=="verify"){
            if (form.verifycode === "") {
            Alert.alert("Oops!", "Please fill in all fields");
            } else {
                const result= await VerifyCodeReq({verifycode:form.verifycode},updateData)
                setMessage(result)
                if (result=='Varified, create password.'){
                    setTimeout(() => {
                        setVerifyorPaswword("password")
                        setIsSubmitting(false)
                      }, 1000)
                }else if(result=='Not varified, try again') {
                    setTimeout(() => {
                        setIsSubmitting(false)
                        
                      }, 1000)
                    
                }
            }

            //reset password form condition
        }else if (verifyorpaswword=="password"){
            if (form.password2 === "" || form.password1 === "") {
                Alert.alert("Oops!", "Please fill in all fields");
            }else if((form.password1 !=form.password2)){
                Alert.alert("Oops!", "Passwords don't match")
            
            }else{
                let dataToSent={
                    username:user.username,
                    email:user.email,
                    password:form.password1,
                    cart:user.cart,
                    let:user.groceries,
                    recipes:user.recipes,
                    action:user.action,
                    verifycode:form.verifycode
                }
                const result2= await SetAccountReq(dataToSent,updateData)
                setMessage(result2)
                if (result2=='Varified,action completed.'){
                    setTimeout(() => {
                        resetAccess()
                        clearTimeout(timeoutId)
                        router.replace("sign-in")
                        
                      }, 1000)
                }else if(result2=='Something went wrong') {
                    setTimeout(() => {
                        router.replace('/')
                      }, 1000)
                    
                }

            }
              

        }
    };
    const othercontainorStyles="bg-background-beige border-burgundy opacity-[0.7] rounded-md p-3 text-background-red flex flex-row items-center rounded-full border border-2"
    return (
        
        <SafeAreaView className="bg-background-red h-full">
        <View className="flex-row h-[80px] mt-[30px] ml-[20px]">
            <Text className="color-offwhite text-5xl font-bold mt-[20px] text-primary">Eat</Text>
            <Text className="color-offwhite underline-[2px] text-5xl font-bold leading-[80px]" style={{fontFamily:'Pacifico_400Regular'}}>Easy</Text>
            <Image source={require('../../assets/images/logo1.png')}  className="w-[50px] h-[50px] mt-[20px]" />
            </View>
            
            {(access.canAccessVerify&&(verifyorpaswword=="verify")) && 
            (<ScrollView className=" h-[800px] " style={{ zIndex: 0 }}>
            <View className="w-full flex justify-center h-full px-4  m-[px] mt-[40px]">
            <View className="">
            <Text className="text-3xl font-semibold text-burgundy mt-10 font-psemibold">
                Verify your account
            </Text>
            <Text className="text-[20px] font-semibold text-burgundy mt-2 font-psemibold">
                with code sent to your mail:
            </Text>
            <Text className="text-[20px] font-semibold text-burgundy mt-2 font-psemibold">
                {user.email}
            </Text>
            </View>
            

            <FormField
                title="code"
                value={form.verifycode}
                handleChangeText={(e) => setForm({ ...form, verifycode: e })}
                otherStyles="mt-7"
                secureTextEntry
                othercontainorStyles={othercontainorStyles}
                type='password'
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
            {(access.canAccessVerify&&(verifyorpaswword=="password")) && 
            (<ScrollView className=" h-[800px] " style={{ zIndex: 0 }}>
                <View className="w-full flex justify-center h-full px-4  m-[px] mt-[40px]">
                  <View className="">
                  <Text className="text-3xl font-semibold text-burgundy mt-10 font-psemibold">
                    Choose Password 
                  </Text>
                  </View>
                  
        
                  <FormField
                    title="Password"
                    value={form.password1}
                    handleChangeText={(e) => (
                        setForm({ ...form, password1: e }))}
                    otherStyles="mt-7"
                    secureTextEntry={true}
                    othercontainorStyles={othercontainorStyles}
                  />
                  <FormField
                    title="Password Again"
                    value={form.password2}
                    handleChangeText={(e) => setForm({ ...form, password2: e })}
                    otherStyles="mt-7"
                    secureTextEntry={true}
                    othercontainorStyles={othercontainorStyles}
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
        
                  
                </View>
              </ScrollView>)}
            {!(access.canAccessVerify) && (
                <View className="flex items-center justify-center">
                    <View className="  flex items-center">
                        <Text className="text-4xl font-pbold text-burgundy mt-10 font-psemibold">
                            Error
                        </Text>
                        <Text className="text-2xl font-psemibold text-blackmt-1 font-psemibold">
                            Something went worng
                        </Text>
                    </View>
                    <View className="  flex-row mt-4">
                        <Text className="text-sm text-gray-200 font-plight">Didn't get the mail?  </Text>
                        <Link href="/sign-up" className="text-sm font-psemibold text-white">back to Sign Up</Link>
                    </View>
                </View>
            )}
            <View className="items-center mt-[30px]">
                <Text className="text-sm font-psemibold text-white">
                    {message}
                </Text >
            </View>
        <Image source={require('../../assets/images/background.png')}  className="absolute w-[500px] h-[500px] top-[450px] left-[50px]" style={{ opacity: 0.5, zIndex: -1 }}
        />
        </SafeAreaView>
    );
    }

export default Verify;
