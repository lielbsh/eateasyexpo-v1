import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import Header from "../../components/custom/Header";
import ConfirmationModal from "../../components/ConfirmationModal";
import {
  convertToIndexes,
  convertToFoodList,
} from "../../scripts/convertToFood.js";
import CartItem from "../../components/custom/CartItem"; // Import the new CartItem component
import FloatingActionButton from "../../components/custom/FloatingActionButton";
import backgroundImage from "../../assets/images/background4.png";
import SearchGroceryModal from "../../components/custom/SearchGroceryModal";
import { useDataGuard } from "../../components/data/globaldata.jsx";

const Cart = () => {
  const { user, updateData, resetData, updateCart } = useDataGuard();
  // let [toBuyList, setToBuyList] = useState(convertToFoodList(user.cart));
  // let [atHomeList, setAtHomeList] = useState(user.groceries);
  const [searchMode, setSearchMode] = useState(false);
  const [animatedScale] = useState(new Animated.Value(1));
  const [itemToDelete, setItemToDelete] = useState(null);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const combinedList = [...user.cart, ...user.groceries]; // Combined list for rendering both toBuy and atHome items

  // Function to toggle item status between "to buy" and "at home"
  const toggleItemStatus = (id, animatedValue) => {
    const itemIndex = user.cart.findIndex((item) => item === id);
    // Animate item moving out of the list
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (itemIndex !== -1) {
        // Item is in the toBuyList, move it to atHomeList;
        updateCart(
          user.cart.filter((item) => item !== id),
          [...user.groceries, id]
        );
      } else {
        // Item is in the atHomeList, move it back to toBuyList
        updateCart(
          [...user.cart, id],
          user.groceries.filter((item) => item !== id)
        );
      }
      console.log(itemIndex);
      // Animate item moving back into the list
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

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
      // Remove item from atHomeList
      updateData(
        "cart",
        user.cart.filter((item) => item !== itemToDelete)
      );
      updateData(
        "groceries",
        user.groceries.filter((item) => item !== itemToDelete)
      );
    }
    setConfirmationVisible(false);
  };

  return (
    <SafeAreaView className="h-full" edges={["top", "left", "right"]}>
      {/* Header Section */}
      <Header color={"#fff5dc"} />

      {/* Title Section */}
      <View
        className="items-center "
        style={{ backgroundColor: "rgba(255, 254, 252,0)" }}
      >
        <Text className="text-3xl font-psemibold color-offwhite ">
          your cart
        </Text>
      </View>

      {/* Modal for search functionality */}
      <SearchGroceryModal
        _searchMode={searchMode}
        _toggleSearchMode={toggleSearchMode}
        _title={"add new item"}
      />

      <View className="flex-1 p-1">
        {/* FlatList to display combined grocery items */}
        <FlatList
          data={combinedList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CartItem
              item={convertToFoodList([item])[0]}
              isAtHome={user.groceries.some((homeItem) => homeItem === item)}
              onToggle={toggleItemStatus}
              onDelete={deleteItem}
            />
          )}
        />

        {/* Floating Action (+) Button for search */}
        <View className="absolute bottom-5 right-5">
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
          title={"Are you sure you want to delete this item?"}
        />
      </View>

      <View
        className="absolute h-[full] w-[full] top-[0px] left-0 "
        style={{ backgroundColor: "#F1684B", zIndex: -2 }}
      >
        <Image
          source={backgroundImage}
          className=" h-[full] w-[full] top-[0px] left-0 "
          style={{ opacity: 0.7, zIndex: -1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

// import React, { useState, useEffect, useMemo } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Animated,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
//   StyleSheet,
// } from "react-native";
// import Header from "../../components/custom/Header";
// import ConfirmationModal from "../../components/ConfirmationModal";
// import {
//   convertToIndexes,
//   convertToFoodList,
// } from "../../scripts/convertToFood.js";
// import CartItem from "../../components/custom/CartItem"; // Import the new CartItem component
// import FloatingActionButton from "../../components/custom/FloatingActionButton";
// import backgroundImage from "../../assets/images/background4.png";
// import SearchGroceryModal from "../../components/custom/SearchGroceryModal";
// import { useDataGuard } from "../../components/data/globaldata.jsx";

// const Cart = () => {
//   const { user, updateData, resetData } = useDataGuard();

//   // Derive lists directly from global state
//   const toBuyList = useMemo(() => convertToFoodList(user.cart), [user.cart]);
//   const atHomeList = useMemo(
//     () => convertToFoodList(user.groceries),
//     [user.groceries]
//   );

//   // UI States
//   const [searchMode, setSearchMode] = useState(false);
//   const [animatedScale] = useState(new Animated.Value(1));
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const [confirmationVisible, setConfirmationVisible] = useState(false);

//   const toggleItemStatus = (id, animatedValue) => {
//     const isInToBuy = toBuyList.some((item) => item.id === id);

//     // Animate item moving out of the list
//     Animated.timing(animatedValue, {
//       toValue: 100,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       if (isInToBuy) {
//         // Move from toBuyList to atHomeList
//         const itemToMove = toBuyList.find((item) => item.id === id);
//         const updatedToBuyList = toBuyList.filter((item) => item.id !== id);
//         const updatedAtHomeList = [...atHomeList, itemToMove];

//         // setToBuyList(updatedToBuyList);
//         updateData("cart", convertToIndexes(updatedToBuyList));

//         // setAtHomeList(updatedAtHomeList);
//         updateData("groceries", convertToIndexes(updatedAtHomeList));
//       } else {
//         // Move from atHomeList to toBuyList
//         const itemToMove = atHomeList.find((item) => item.id === id);
//         const updatedAtHomeList = atHomeList.filter((item) => item.id !== id);
//         const updatedToBuyList = [...toBuyList, itemToMove];

//         // setAtHomeList(updatedAtHomeList);
//         updateData("groceries", convertToIndexes(updatedAtHomeList));

//         // setToBuyList(updatedToBuyList);
//         updateData("cart", convertToIndexes(updatedToBuyList));
//       }

//       // Animate item moving back into the list
//       Animated.timing(animatedValue, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     });
//   };

//   // Combine lists for rendering
//   const combinedList = useMemo(
//     () => [...toBuyList, ...atHomeList],
//     [toBuyList, atHomeList]
//   );

//   // Function to toggle search mode and animate the Floating Action Button
//   const toggleSearchMode = () => {
//     setSearchMode((prev) => !prev);
//     Animated.spring(animatedScale, {
//       toValue: searchMode ? 1 : 1.5,
//       friction: 3,
//       useNativeDriver: true,
//     }).start();
//   };

//   // Animated style for the Floating Action Button
//   const animatedStyle = {
//     transform: [{ scale: animatedScale }],
//   };

//   // Function to initiate item deletion
//   const deleteItem = (id) => {
//     setItemToDelete(id);
//     setConfirmationVisible(true);
//   };

//   // Function to confirm deletion of an item
//   const confirmDelete = () => {
//     if (itemToDelete !== null) {
//       // Remove item from atHomeList
//       const updatedAtHomeList = atHomeList.filter(
//         (item) => item.id !== itemToDelete
//       );
//       updateData("groceries", convertToIndexes(updatedAtHomeList));

//       // Remove item from toBuyList
//       const updatedToBuyList = toBuyList.filter(
//         (item) => item.id !== itemToDelete
//       );
//       updateData("cart", convertToIndexes(updatedToBuyList));
//     }
//     setConfirmationVisible(false);
//   };

//   return (
//     <SafeAreaView className="h-full" edges={["top", "left", "right"]}>
//       {/* Header Section */}
//       <Header color={"#fff5dc"} />

//       {/* Title Section */}
//       <View
//         className="items-center "
//         style={{ backgroundColor: "rgba(255, 254, 252,0)" }}
//       >
//         <Text className="text-3xl font-psemibold color-offwhite ">
//           your cart
//         </Text>
//       </View>

//       {/* Modal for search functionality */}
//       <SearchGroceryModal
//         _searchMode={searchMode}
//         _toggleSearchMode={toggleSearchMode}
//         _title={"Add New Item"}
//       />

//       <View className="flex-1 p-1">
//         {/* FlatList to display combined grocery items */}
//         <FlatList
//           data={combinedList}
//           keyExtractor={(item) => item.id.toString()}
//           renderItem={({ item }) => (
//             <CartItem
//               item={item}
//               isAtHome={atHomeList.some((homeItem) => homeItem.id === item.id)}
//               onToggle={toggleItemStatus}
//               onDelete={deleteItem}
//             />
//           )}
//         />

//         {/* Floating Action (+) Button for search */}
//         <View className="absolute bottom-5 right-5">
//           <FloatingActionButton
//             animatedStyle={animatedStyle}
//             onPress={toggleSearchMode}
//             backgroundColor="#b90000"
//           />
//         </View>

//         {/* Confirmation modal for item deletion */}
//         <ConfirmationModal
//           visible={confirmationVisible}
//           onClose={() => setConfirmationVisible(false)}
//           onConfirm={confirmDelete}
//           title={"Are you sure you want to delete this item?"}
//         />
//       </View>

//       {/* Background Image */}
//       <View
//         className="absolute h-[full] w-[full] top-[0px] left-0 "
//         style={{ backgroundColor: "#F1684B", zIndex: -2 }}
//       >
//         <Image
//           source={backgroundImage}
//           className=" h-[full] w-[full] top-[0px] left-0 "
//           style={{ opacity: 0.7, zIndex: -1 }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// // Stylesheet for the component
// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff5dc",
//   },
//   titleContainer: {
//     alignItems: "center",
//     backgroundColor: "transparent",
//     paddingVertical: 10,
//   },
//   titleText: {
//     fontSize: 32,
//     fontWeight: "600",
//     color: "#333",
//   },
//   mainContainer: {
//     flex: 1,
//     padding: 10,
//   },
//   flatListContent: {
//     paddingBottom: 80, // To ensure space for the Floating Action Button
//   },
//   backgroundContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     height: "100%",
//     width: "100%",
//     zIndex: -1,
//   },
//   backgroundImage: {
//     height: "100%",
//     width: "100%",
//     opacity: 0.7,
//   },
// });

// export default Cart;
