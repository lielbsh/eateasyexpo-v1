import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AutoScrollBanner from '../../components/AutoScrollBanner';
import CustomSearchBar from '../../components/custom/CustomSearchBar';
import Header from '../../components/custom/Header';
import SearchModal from '../../components/custom/SearchModal';


const Home = () => {
  const username = 'Assaf';
  const [searchMode, setSearchMode] = useState(false);
  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
  }

  const [savedRecipes, setSavedRecipes] = useState([
    { title: 'Cake', id: 1 },
    { title: 'Salad', id: 2 },
  ]);

  const items = [
    { id: 1, name: 'Item 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_L_h3waPOw1ELBb8fbAD0hBT-umrayla5JA&s' },
    { id: 2, name: 'Item 2', image: 'data:image/jpeg;base64,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' },
    { id: 3, name: 'Item 3', image: 'https://www.allrecipes.com/thmb/-WUPqM8DWIsTXZD4upF3pV1FItQ=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7002049-pinto-beans-with-mexican-style-seasonings-Janice-1x1-1-424eab91a3fb48b2b48f61033e4c61dd.jpg' },
  ];

  const suggestions = [
    { id: 1, name: 'Italian', image: require("../../assets/icons/italianfood.png") },
    { id: 2, name: 'Chinese', image: require("../../assets/icons/cheinesefood.png") },
    { id: 3, name: 'Mexican', image: require("../../assets/icons/mexicanfood.png") },
    { id: 4, name: 'Japanese', image: require("../../assets/icons/japanesefood.png") },
    { id: 5, name: 'Indian', image: require("../../assets/icons/indianfood.png") },
    { id: 6, name: 'Greek', image: require("../../assets/icons/greekfood.png") },
  ];

  // Helper function to render suggestions
  const renderSuggestions = () => {
    return suggestions.map(item => (
      <TouchableOpacity key={item.id} className="w-[70px] bg-background-offwhitesheer rounded-[10px] items-center" onPress={() => router.push("/sign-up")}>
        <Text className="text-[15px] font-semibold color-shadow mt-[10px] max-w-[190px] max-h-[30px]">{item.name}</Text>
        <Image source={item.image} className="w-[25px] h-[25px] rounded-[10px] mt-[3px]" />
      </TouchableOpacity>
    ));
  };

  // Helper function to render saved recipes
  const renderSavedRecipes = () => {
    return items.map(item => (
      <View key={item.id} className="w-[202px] rounded-[10px] items-center"
      
      >
        <TouchableOpacity activeOpacity={0.7} className="w-[200px] rounded-[9px] items-center justify-center"  onPress={() => router.push("/sign-up")}>
          
        <View
          style={{
            width: 195,
            height: 145,
            marginTop: 5,
            
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10
              
            }}
          />
        </View>
        <View className="absolute bottom-[0px] w-[195px] bg-black/50 py-2 px-4 rounded-b-lg items-center">
          <Text className="text-[15px] font-bold text-white shadow-md">
              {item.name}
          </Text>
        </View>
          {/* <Text className="text-[20px] font-bold color-shadow my-[5px] max-w-[190px] max-h-[30px]">{item.name}</Text> */}
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <SafeAreaView className="bg-background-beige flex-1" edges={['top', 'left', 'right']} >

      {/* Header Section */}
      <Header
      color={"#F1684B"}/>
      
      <ScrollView >

        <View className="flex-1 px-4">
          <Text className="text-3xl font-psemibold color-green mb-[10px]">Hi {username}!</Text>

          {/* Search Bar & Modal*/}
          <CustomSearchBar
            title={'What Will We Be Cooking Today?'}
            handelPress={toggleSearchMode}
          />
          <SearchModal
            _title={"What Will We Be Cooking Today?"}
            _searchMode={searchMode}
            _toggleSearchMode={toggleSearchMode}
          />

          {/* Horizontal Scroll Section for Suggestions */}
          <View className="h-[65px]">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="h-[200px] space-x-[5px]">
              {renderSuggestions()}
            </ScrollView>
          </View>

          {/* Auto Scroll Banner */}
          <AutoScrollBanner />

          {/* Saved Recipes Section */}
          <View className="h-[210px] mt-[30px] rounded-[10px] p-[5px] pl-[15px]"style={{backgroundColor:'rgba(255, 254, 252,0.7)'}} >
            <Text className="text-[20px] font-bold color-shadow mb-[15px] mt-[3px]">Some of the dishes you saved</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="h-[200px] space-x-[0px]">
              {renderSavedRecipes()}
            </ScrollView>
          </View>
        </View>

        
      </ScrollView>
      <Image source={require('../../assets/images/background3.png')} className="absolute w-[700px] h-[550px] top-[-200px] left-[230px]" style={{ opacity: 0.7, zIndex: -1 }} />
        <Image source={require('../../assets/images/background3.png')} className="absolute w-[700px] h-[550px] top-[340px] left-[-550px]" style={{ opacity: 0.7, zIndex: -1 }} />
    </SafeAreaView>
  );
};

export default Home;


