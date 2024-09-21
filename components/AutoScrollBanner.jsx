import { View, Text, Dimensions, Image, StyleSheet, FlatList, TouchableOpacity, Alert , Linking, Button} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons'; // Expo icons


const { width } = Dimensions.get('window');

const massagesData = [
    { key:'autumn recipes' ,message: "Discover autumn recipes 🍂", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwIlgxV2UHUOeFja0pKxtDiTY2DMsGgs9S6A&s', url:'/recipes' },
    { key:'Plant Based recipes' ,message: "Plant Based recipes", image: 'https://www.foodnavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/food-beverage-nutrition/foodnavigator.com/news/market-trends/plant-based-products-that-attempt-to-mimic-the-nutritional-qualities-of-meat-and-dairy-are-playing-a-losing-game/16371272-1-eng-GB/Plant-based-products-that-attempt-to-mimic-the-nutritional-qualities-of-meat-and-dairy-are-playing-a-losing-game.jpg', url:'/recipes'},
    { key:'holiday recipes' ,message: "🎄 Try our special holiday recipes! 🎄", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKW-UEbnPGl4WXk9AjBLt5vT0GTlar_QL3fQ&s', url:'/recipes' },
    { key:'vegan' ,message: "Try the 22 days vegan chalange!", image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQdBZWgLKPu0E4XakOegJgaiE7v6i1ZbSHbg&s', url:'https://challenge22.com/?gad_source=1&gclid=Cj0KCQjwurS3BhCGARIsADdUH52mcBCMM3krACEbiGfLn42xU1e4UYJSRUHCpLRS-F-EsMwv0Y0zouoaAsuIEALw_wcB'},
    // { key:5 ,message: 'A new feature we added to the app', image: 'https://example.com/feature.jpg' }
  ];


const AutoScrollBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
          let nextIndex = (currentIndex + 1) % massagesData.length;
          setCurrentIndex(nextIndex);
          flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        }, 5000); // Change every 5 seconds
    
        return () => clearInterval(interval); // Clear interval on component unmount
      }, [currentIndex]);


    const pressHandler = (item) => {
        if (item.url.startsWith('http')) {
            // External URL
            Linking.openURL(item.url).catch(err => console.error("Couldn't open URL", err));
        } else {
            // Internal navigation
            router.push(item.url);
        }
    };

    const deleteItem = () => {
      Alert.alert('deleted')
    };

  return (
    <View className='mt-[20px] bg-white/50 py-2 px-4 rounded-lg'>
      <Text className="text-lg font-bold">Notifications</Text>
      <FlatList
          ref={flatListRef}
          data={massagesData}
          horizontal
          pagingEnabled
          scrollEnabled={false} // Prevent manual scrolling
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => pressHandler(item)} 
              className="relative justify-center items-center w-full mt-5"
              style={{ width }}>
              <Image 
                  source={{ uri: item.image }} 
                  className="h-[220px] w-full rounded-xl object-cover shadow-lg"
              />
              <View className="absolute bottom-0 w-full bg-black/50 py-2 px-4 rounded-b-lg">
                  <Text className="text-lg font-bold text-white shadow-md">
                      {item.message}
                  </Text>
              </View>

              {/* delete icon */}
              
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default AutoScrollBanner;