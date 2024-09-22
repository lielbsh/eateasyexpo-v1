import React, { useState } from 'react';
import { View, Text, FlatList, Animated, TouchableOpacity, SafeAreaView, Modal, Image } from 'react-native';
import Header from '../../components/Header'; 
import CustomSearchBar from '../../components/CustomSearchBar'; 
import { icons } from '../../constants'; 
import ConfirmationModal from '../../components/ConfirmationModal';
import { toBuyList as initialToBuyList, atHomeList as initialAtHomeList } from '../../scripts/convertToFood';
import CartItem from '../../components/CartItem'; // Import the new CartItem component
import FloatingActionButton from '../../components/FloatingActionButton';
import backgroundImage from '../../assets/images/background4.png';


const Cart = () => {
  // Initial state for grocery lists and UI states
  const [toBuyList, setToBuyList] = useState(initialToBuyList);
  const [atHomeList, setAtHomeList] = useState(initialAtHomeList);
  const [searchMode, setSearchMode] = useState(false);
  const [animatedScale] = useState(new Animated.Value(1));
  const [itemToDelete, setItemToDelete] = useState(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  
  // Function to toggle item status between "to buy" and "at home"
  const toggleItemStatus = (id, animatedValue) => {
    const itemIndex = toBuyList.findIndex((item) => item.id === id);
    // Animate item moving out of the list
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (itemIndex !== -1) {
        // Item is in the toBuyList, move it to atHomeList
        const itemToMove = toBuyList[itemIndex];
        setToBuyList((prev) => prev.filter((item) => item.id !== id));
        setAtHomeList((prev) => [...prev, itemToMove]);
      } else {
        // Item is in the atHomeList, move it back to toBuyList
        const itemIndexAtHome = atHomeList.findIndex((item) => item.id === id);
        const itemToMoveBack = atHomeList[itemIndexAtHome];
        setAtHomeList((prev) => prev.filter((item) => item.id !== id));
        setToBuyList((prev) => [...prev, itemToMoveBack]);
      }
      // Animate item moving back into the list
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  // Combined list for rendering both toBuy and atHome items
  const combinedList = [...toBuyList, ...atHomeList];

  // Function to toggle search mode and animate the Floating Action Button
  const toggleSearchMode = () => {
    setSearchMode(!searchMode);
    Animated.spring(animatedScale, {
      toValue: searchMode ? 1 : 1.5,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // Animated style for the Floating Action Button
  const animatedStyle = {
    transform: [{ scale: animatedScale }],
  };

  // Function to initiate item deletion
  const deleteItem = (id) => {
    setItemToDelete(id);
    setConfirmationVisible(true);
  };

  // Function to confirm deletion of an item
  const confirmDelete = () => {
    if (itemToDelete !== null) {
      // Remove item from both lists
      setAtHomeList((prevListData) => prevListData.filter((item) => item.id !== itemToDelete));
      setToBuyList((prevListData) => prevListData.filter((item) => item.id !== itemToDelete));
    }
    setConfirmationVisible(false);
  };

  return (
    <SafeAreaView className="bg-background-beige flex-1 "  edges={['top', 'left', 'right']}>
      <Header
      color={"#fff5dc"} />
      <View className="p-4 flex-1">
        <Text className="text-2xl font-psemibold mb-[10px]">your cart</Text>

        {/* Modal for search functionality */}
        <Modal visible={searchMode} transparent={true} animationType="fade">
          <View className="flex-1 p-4 bg-background-beige opacity-95 mt-[40px]">
            <TouchableOpacity onPress={toggleSearchMode}>
              <Image source={icons.logout} className="w-10 h-9" />
            </TouchableOpacity>
            <CustomSearchBar />
          </View>
        </Modal>
        
        {/* FlatList to display combined grocery items */}
        <FlatList
          data={combinedList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              isAtHome={atHomeList.some((homeItem) => homeItem.id === item.id)}
              onToggle={toggleItemStatus}
              onDelete={deleteItem}
            />
          )}
        />

        {/* Floating Action (+) Button for search */}
        {/* <View className="absolute top-3 right-7">
          <TouchableOpacity onPress={toggleSearchMode}>
            <Animated.View style={[animatedStyle, {backgroundColor:"#b90000", borderRadius: 50, padding: 10 }]}>
              <Feather name="plus" size={24} color="white" />
            </Animated.View>
          </TouchableOpacity>
        </View> */}
        <View className="absolute bottom-15 right-5">
        <FloatingActionButton 
          animatedStyle={animatedStyle} 
          onPress={toggleSearchMode}
          backgroundColor="#b90000" 
        />
      </View>
        
        {/* Confirmation modal for item deletion */}
        <ConfirmationModal
          visible={confirmationVisible}
          onClose={() => setConfirmationVisible(false)}
          onConfirm={confirmDelete}
          title={'Are you sure you want to delete this item?'}
        />
      </View>
      <View  className='absolute h-[full] w-[full] top-[0px] left-0 ' style={{ backgroundColor:"#F1684B",zIndex:-2}}>
      <Image source={backgroundImage} className=' h-[full] w-[full] top-[0px] left-0 ' style={{ opacity:0.7,zIndex:-1}}/>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

