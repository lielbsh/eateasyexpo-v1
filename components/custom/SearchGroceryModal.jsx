import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants";
import Icon from "react-native-vector-icons/Ionicons";
import { useDataGuard } from "../../components/data/globaldata.jsx";
import { groceries } from "../../scripts/puppeteer/groceries.js";
import {
  convertToIndexes,
  convertToFoodList,
} from "../../scripts/convertToFood.js";
import LoadingDots from "./LoadingDots.jsx";
// async function groceries() {
//   return [
//     {
//       id: "1",
//       hitname: "Prepared Graham Cracker Crust",
//     },
//     {
//       id: "2",
//       hitname: "Another Ingredient",
//     },
//     {
//       id: "3",
//       hitname: "Prepared Graham Cracker Crust",
//     },
//     {
//       id: "4",
//       hitname: "Another Ingredient",
//     },
//   ];
// }

const SearchGroceryModal = ({ _searchMode, _toggleSearchMode, _title }) => {
  const { user, updateData, resetData } = useDataGuard();
  //
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Effect to handle search triggering
  useEffect(() => {
    if (searchTriggered && query) {
      const fetchData = async () => {
        setLoading(true);
        setSearchAttempted(true); // Mark that a search has been attempted
        try {
          const fetchedResults = await groceries({ stringInput: query }); // Fetch search results
          setResults(fetchedResults);
          console.log(fetchedResults);
        } catch (error) {
          console.error("Error fetching results: ", error);
        } finally {
          setLoading(false);
          setSearchTriggered(false); // Reset the flag after search
        }
      };

      fetchData();
    }
  }, [searchTriggered, query]);

  // Effect to reset state when modal opens
  useEffect(() => {
    if (_searchMode) {
      // Reset all relevant state variables
      setQuery("");
      setResults([]);
      setLoading(false);
      setSearchTriggered(false);
      setSearchAttempted(false);
      setSelectedItems([]);
    }
  }, [_searchMode]);

  const handleSearch = () => {
    setSearchTriggered(true); // Set the flag to true to trigger the effect
    // console.log(results);
  };

  const handleSelectItem = (item) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item); // Remove if already selected
      }
      return [...prevItems, item]; // Add to selected list
    });
  };

  const handleSaveSelectedItems = () => {
    console.log("Selected items saved:", selectedItems);
    _toggleSearchMode(); // Close the modal after saving
    updateData("cart", [...user.cart, ...convertToIndexes(selectedItems)]);
    console.log(user.cart);
  };

  return (
    <Modal
      visible={_searchMode}
      transparent={true}
      animationType="fade"
      className="flex-1"
    >
      <View className="flex-1 p-4 bg-background-offwhite opacity-95">
        {/* Return Button */}
        <TouchableOpacity onPress={_toggleSearchMode}>
          <Image
            source={icons.back}
            className="w-10 h-10 mt-[10%]"
            tintColor="grey"
          />
        </TouchableOpacity>

        {/* Search Bar */}
        <View className="my-4">
          <View className="flex-row items-center bg-background-shadow p-3 rounded-full shadow-sm opacity-[0.7]">
            <TextInput
              placeholder={_title}
              className="flex-1 color-offwhite text-bold"
              placeholderTextColor={"white"}
              maxLength={15}
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Image source={icons.search} className="w-6 h-6 mr-2" />
            </TouchableOpacity>
          </View>

          {/* Displaying Grocery Results */}
          {loading ? (
            <LoadingDots />
          ) : searchAttempted && results.length === 0 ? (
            <View className="items-center justify-center mt-[20px]">
              <Text className="color-gray text-[18px] font-medium">
                Oops! No results found😞
              </Text>
            </View>
          ) : (
            <View>
              <ScrollView className="mt-[20]">
                {results.map((result, index) => {
                  // Check if the item is already in the cart or groceries
                  const isInCart = user.cart.some((item) => item === result.id);
                  const isInGroceries = user.groceries.some(
                    (item) => item === result.id
                  );

                  return (
                    <View key={index}>
                      <TouchableOpacity
                        style={{
                          backgroundColor:
                            isInGroceries || isInCart
                              ? "rgba(0,0,0,0.3)"
                              : "transparent",
                          padding: 10,
                          borderRadius: 5,
                        }}
                        className="flex-row justify-between items-center"
                        onPress={() => {
                          if (!isInCart && !isInGroceries) {
                            console.log("is", isInCart, isInGroceries);
                            handleSelectItem(result);
                          }
                        }}
                      >
                        <Text className="font-bold text-lg flex-shrink">
                          {result.hitname}
                        </Text>

                        {/* Conditionally rendering icons based on the status */}
                        <Icon
                          name={
                            isInGroceries
                              ? "checkmark-circle" // Show "V" if it's in groceries
                              : isInCart
                              ? "checkmark-circle" // Show as already added to the cart
                              : "add-circle" // Default icon for new items
                          }
                          color={
                            selectedItems.includes(result)
                              ? "green" // Green color for groceries
                              : isInCart
                              ? "green" // Blue color for cart items
                              : "gray" // Gray for not yet selected items
                          }
                          size={35}
                        />
                      </TouchableOpacity>

                      <View
                        style={{
                          height: 1,
                          backgroundColor: "gray",
                          marginVertical: 7,
                        }}
                      />
                    </View>
                  );
                })}
                <View className="h-[200px] w-full"></View>
              </ScrollView>
            </View>
          )}
        </View>
      </View>
      {/* Floating Checkmark Icon */}
      {selectedItems.length > 0 && (
        <TouchableOpacity
          onPress={handleSaveSelectedItems}
          className="absolute bottom-10 right-5 p-3 bg-green rounded-full shadow-lg"
        >
          <Icon name="checkmark" color="white" size={30} />
        </TouchableOpacity>
      )}
    </Modal>
  );
};

export default SearchGroceryModal;
