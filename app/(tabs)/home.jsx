import { View, Text, Image, TouchableOpacity, FlatList,ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import { icons } from '../../constants';
import{router} from 'expo-router';


const Home = () => {
  const username='Assaf'
  const [savedRecipes, setSavedRecipes] = useState([
    { title: 'Cake', id: 1, },
    { title: 'Salad', id: 2 }
  ]);
  const items = [
    { id: 1, name: 'Item 1 Item 1 Item 1', image: 'https://www.allrecipes.com/thmb/-WUPqM8DWIsTXZD4upF3pV1FItQ=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7002049-pinto-beans-with-mexican-style-seasonings-Janice-1x1-1-424eab91a3fb48b2b48f61033e4c61dd.jpg' },
    { id: 2, name: 'Item 2 Item 2 Item 2', image: 'https://www.allrecipes.com/thmb/-WUPqM8DWIsTXZD4upF3pV1FItQ=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7002049-pinto-beans-with-mexican-style-seasonings-Janice-1x1-1-424eab91a3fb48b2b48f61033e4c61dd.jpg' },
    { id: 3, name: 'Item 3 Item 3 Item 3', image: 'https://www.allrecipes.com/thmb/-WUPqM8DWIsTXZD4upF3pV1FItQ=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7002049-pinto-beans-with-mexican-style-seasonings-Janice-1x1-1-424eab91a3fb48b2b48f61033e4c61dd.jpg' },
    // Add more items as needed
  ];
  const Suggestions = [
    { id: 1, name: 'Italian', image: require("../../assets/icons/italianfood.png") },
    { id: 2, name: 'Chienese', image:  require("../../assets/icons/cheinesefood.png") },
    { id: 3, name: 'Mexican', image:  require("../../assets/icons/mexicanfood.png" )},
    { id: 4, name: 'Japanese', image: require("../../assets/icons/japanesefood.png" )},
    { id: 5, name: 'Indian', image: require("../../assets/icons/indianfood.png" )},
    { id: 6, name: 'Greek', image:  require("../../assets/icons/greekfood.png" )},
  ];
  
  return (
    <SafeAreaView className="bg-background-beige h-full">
      <View className="flex-row h-[60px] mt-[20px] ml-[20px]">
          <Text className="color-red text-3xl font-bold mt-[0px] text-primary">Eat</Text>
          <Text className="color-red underline-[2px] text-3xl font-bold font-cursive leading-[42px]">Easy</Text>
          <Image source={require('../../assets/images/logo2.png')}  className="w-[45px] h-[45px] mt-[-4px]" />
        </View>
      <View className="flex-1 px-4">
      <Text className="text-3xl font-psemibold color-green mb-[10px]">Hi {username}!</Text>
        {/* Header Section */}
        

        {/* Search Bar */}
        <View className="my-4">
          <View className="flex-row items-center bg-background-shadow p-3 rounded-full shadow-sm opacity-[0.7]">
            
            <TextInput
              placeholder="What Will We Be Cooking Today?"
              className="flex-1 color-offwhite text-bold"
              placeholderTextColor={'white'}
            />
            <Image 
            source={icons.search} className="w-6 h-6 mr-2"
            
            />
          </View> 
        </View>

        {/* Saved Recipes Section */}
        <View className="h-[65px] ">
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className=" h-[200px] space-x-[5px]">
            {Suggestions.map(item => (  
              <TouchableOpacity
              key={item.id} className=" w-[70px] bg-background-offwhitesheer rounded-[10px] items-center"
              onPress={() => router.push("/sign-up")} // Navigate to register screen
              >
                <Text className="text-[15px] font-semibold color-shadow mt-[10px] max-w-[190px] max-h-[30px]">{item.name}</Text>
                <Image source={item.image} className="w-[25px] h-[25px] rounded-[10px] mt-[3px]"/>
              </TouchableOpacity>
              
            ))}
          </ScrollView>
        </View>
        
        <View className="h-[200px] mt-[100px]">
          <Text className="text-[20px] font-semibold color-shadow mb-2">Remake the dishes you saved</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className=" h-[200px] space-x-[10px]">
            {items.map(item => (
              <View key={item.id} className=" w-[202px] bg-gray-800 rounded-[10px] items-center">
              <TouchableOpacity activeOpacity={0.7} key={item.id} className=" w-[200px] bg-background-shadowsheer rounded-[10px] items-center" 
              onPress={() => router.push("/sign-up")} // Navigate to register screen
              >
                <Image src={item.image} className="w-[195px] h-[120px] rounded-[10px] mt-[3px]"/>
                <Text className="text-[20px] font-bold color-offwhite mt-[10px] max-w-[190px] max-h-[30px]">{item.name}</Text>
              </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <Image source={require('../../assets/images/background3.png')}  className="absolute w-[700px] h-[550px] top-[-200px] left-[230px]" style={{ opacity: 0.7, zIndex: -1 }}
        />
      <Image source={require('../../assets/images/background3.png')}  className="absolute w-[700px] h-[550px] top-[340px] left-[-550px]" style={{ opacity: 0.7, zIndex: -1 }}
        />
    </SafeAreaView>
  );
}

export default Home;



