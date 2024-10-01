import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { icons } from "../../constants/index.js";
import HeartButton from "../custom/HeartButton.jsx";
import { searchScript } from "../../scripts/puppeteer/searchScript.js";
import { extractRecipe } from "../../scripts/puppeteer/extractRecipe.js";
import RecipeModal from "./RecipeModal.jsx";
import LoadingDots from "../custom/LoadingDots.jsx";
import { useDataGuard } from "../data/globaldata.jsx";

// async function searchScript() {
//   return [
//     {
//         "href": "https://www.allrecipes.com/recipe/231616/vegan-basic-vanilla-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/ZyUS-Li_2K5gprFbu04cjhn5doc=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1029279-fb5de87e8bd44a44be03e09816a75972.jpg",
//         "title": "Vegan Basic Vanilla Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/277883/homemade-vanilla-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/pw7RlGO-yCIPQJem_9zwEpp7G7I=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7656824-db36f7e92ae042f7bcae6b71b859fbd6.jpg",
//         "title": "Homemade Vanilla Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/277000/easy-vanilla-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/-DJuyYp-QXAz1Z33oNWnP1b3mkU=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9224625_EasyVanillaCake4x3-bf9a73c9f6024e9286d96e8f0b59d35d.jpg",
//         "title": "Easy Vanilla Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/8386501/french-vanilla-cake-with-french-vanilla-buttercream-frosting/",
//         "photosrc": "https://www.allrecipes.com/thmb/xl51p5XkbQkw_PVAVuOQspiNBoU=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1651435756DSC_1944202-2000-a66db12f740f4fdf892bc435102403d3.jpg",
//         "title": "French Vanilla Cake with French Vanilla Buttercream Frosting"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/277882/vanilla-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/TpM260QIcXYCp6P8T9j0jVi1enE=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/277882-Vanilla-Cake-d58a3c5be6e048fea2d2481ea6af081f.jpg",
//         "title": "Vanilla Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/269903/vegan-vanilla-cake-with-cookies-n-cream-frosting/",
//         "photosrc": "https://www.allrecipes.com/thmb/g5LMqOYdNPvZRF1LDOqWu0u6vKI=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9158544-fc808b9653d94339a61dbaa01175a299.jpg",
//         "title": "Vegan Vanilla Cake with Cookies-n-Cream Frosting"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/264608/naked-vanilla-cake-with-mascarpone-and-berries/",
//         "photosrc": "https://www.allrecipes.com/thmb/JIXO60sO2VfCFv10a8sltriFT8s=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/5454088-6556c4a382c74fd28d1b8c5413d45238.jpg",
//         "title": "Naked Vanilla Cake with Mascarpone and Berries"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/285351/janes-jelly-filled-vanilla-cake-roll/",
//         "photosrc": "https://www.allrecipes.com/thmb/HXfoC2pKeGmGvGWmioBZKNU72hE=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9440586-8d60b6ae4a3b41d2a902289e233f060c.jpg",
//         "title": "Jane's Jelly-Filled Vanilla Cake Roll"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/238288/vanilla-layer-cake-with-strawberries/",
//         "photosrc": "https://www.allrecipes.com/thmb/rP64Hft4wv2ifxb5RRa4L2babkU=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2262793-716d6ad6837e411fa2cae763461ab643.jpg",
//         "title": "Vanilla Layer Cake with Strawberries"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/24988/vanilla-wafer-cake-iv/",
//         "photosrc": "https://www.allrecipes.com/thmb/VOKhKuTT70d58WpT50kmif-9DCQ=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8307401-8323aa8d3cc54cb192b0ae2c1ff06217.jpg",
//         "title": "Vanilla Wafer Cake IV"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/276999/fluffy-vanilla-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/Z9pnzPhbR3FUY6au-tV4dB2sEpQ=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7991560-398893d4b3b345e89e2d9979f6c4065f.jpg",
//         "title": "Fluffy Vanilla Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/8067/vanilla-wafer-cake-ii/",
//         "photosrc": "https://www.allrecipes.com/thmb/4Nv6lGZODEiP481QkzBOJbMu82o=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/299866-f94111f562b0475f9b1489c34e436d8a.jpg",
//         "title": "Vanilla Wafer Cake II"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/8465521/checkerboard-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/isrWpNAoANqQbd6eyxIPyXwSBlA=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/checkerboard-cake-mfs-Beauty_413-f7ac77ac61284eaaa82753216788cc54.jpg",
//         "title": "Checkerboard Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/280349/vanilla-pound-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/DLQRXIoK_8MEGayEUGzwoucqu9w=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ar_defaultPlaceHolderImage-01ff595bb5c043819991b30b49bbb057.png",
//         "title": "Vanilla Pound Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/268588/moms-vanilla-pound-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/pOnReFWtsak2NW4QVvZOjc-rpAE=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/5884687-8a902c013ed448e2b206daff43dcbcee.jpg",
//         "title": "Mom's Vanilla Pound Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/212454/vanilla-sesame-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/FunXTfM8o3drCD3naQXVbvZAb2U=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7718764-ee36645fc12c4bfaa63607c9c0716dd3.jpg",
//         "title": "Vanilla Sesame Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/276837/lazy-keto-maple-vanilla-mug-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/uKATapTB1Kx3QQcHXMHuUKNJpQE=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7429936-77573e2179ff45d4acaac25be2aeb4d2.jpg",
//         "title": "Lazy Keto Maple-Vanilla Mug Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/18119/vanilla-wafer-cake-iii/",
//         "photosrc": "https://www.allrecipes.com/thmb/HgbIlKfWdQtU98NUon3b6FO08BA=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/655345-7b92ffaa1f47451284357b00322627fe.jpg",
//         "title": "Vanilla Wafer Cake III"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/258264/vanilla-madeira-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/PEgOjdtahExFbaAk94weVQgNi0A=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/6596183-046f7644be044b5b92ef296339de99e0.jpg",
//         "title": "Vanilla Madeira Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/17129/easter-lamb-cake-ii/",
//         "photosrc": "https://www.allrecipes.com/thmb/dRp9KSD9bh8OdXzCT5cwn6lseSY=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/631809-f634d9264754459c9473cdb9ec9c7a89.jpg",
//         "title": "Easter Lamb Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/7891/marble-cake-i/",
//         "photosrc": "https://www.allrecipes.com/thmb/esxnS50hoTlMbZC_a2m_XJkopgk=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7891-Marble-Cake-ddmfs-166-step7-88eea35969f74fa19f5d188961beaae5.jpg",
//         "title": "Marble Cake"
//     },
//     {
//         "href": "https://www.allrecipes.com/recipe/25639/tiramisu-layer-cake/",
//         "photosrc": "https://www.allrecipes.com/thmb/GqRCeHEaHwBsltiRqHiOHKQxuSA=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/TiramisuLayerCakeKim-b51f80ededa24f51804257aa2bbdd1cf.jpg",
//         "title": "Tiramisu Layer Cake"
//     }
// ]}

const SearchRecipeModal = ({
  _searchMode,
  _toggleSearchMode,
  _title,
  _query,
  _autoSearch,
}) => {
  const { user, updateData, resetData } = useDataGuard();
  const [query, setQuery] = useState(_query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(_autoSearch);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const [displayRecipe, setDisplayRecipe] = useState(false); // state of the recipeModal
  const [openRecipe, setOpenRecipe] = useState();
  const [recipeData, setRecipeData] = useState();

  // Effect to handle search triggering
  useEffect(() => {
    if (searchTriggered && query) {
      const fetchData = async () => {
        setLoading(true);
        setSearchAttempted(true); // Mark that a search has been attempted
        try {
          const fetchedResults = await searchScript({ stringInput: query }); // Fetch search results
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
      setQuery(_query);
      setResults([]);
      setLoading(false);
      setSearchTriggered(_autoSearch);
      setSearchAttempted(false);
    }
  }, [_searchMode]);

  const handleSearch = () => {
    if (query) {
      setSearchTriggered(true);
    } // Set the flag to true to trigger the effect
  };

  const pressHandeler = async (result) => {
    let recipe = await extractRecipe({ recipeURL: result.href });
    setRecipeData(recipe);
    setDisplayRecipe(true);
  };

  const saveRecipeHandeler = (item) => {
    updateData("recipes", [...user.recipes, item]);
  };

  return (
    <Modal
      visible={_searchMode}
      transparent={true}
      animationType="fade"
      className="flex-1"
    >
      {/* Extract recipe modal */}
      <RecipeModal
        _state={displayRecipe}
        _toggleRecipeMode={() => {
          setDisplayRecipe(!displayRecipe);
        }}
        _recipe={openRecipe}
        _recipeData={recipeData}
      />

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

          {/* Displaying Search Results */}
          {loading ? (
            <LoadingDots />
          ) : searchAttempted && results.length === 0 ? (
            <View className="items-center justify-center mt-[20px]">
              <Text className="color-gray text-[18px] font-medium">
                No recipes found 😞
              </Text>
              <Text className="text-[14px] color-gray mt-[5px]">
                Try adjusting your search criteria.
              </Text>
            </View>
          ) : (
            <ScrollView className="mt-[20]">
              {results.map((result, index) => (
                <View
                  key={index}
                  style={{ position: "relative", marginBottom: 20 }}
                >
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => {
                      pressHandeler(result);
                      setOpenRecipe(result);
                    }}
                  >
                    {/* Image & Heart Button*/}
                    <View style={{ position: "relative" }}>
                      <Image
                        source={{ uri: result.photosrc }}
                        className="w-36 h-24"
                        resizeMode="cover"
                      />
                      <HeartButton
                        onPress={() => {
                          console.log(`Liked recipe: ${result.title}`);
                          saveRecipeHandeler(result);
                        }}
                      />
                    </View>
                    <Text className="font-bold text-[16px] ml-4 my-auto flex-shrink">
                      {result.title}
                    </Text>
                  </TouchableOpacity>

                  {/* Horizontal line */}
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "gray",
                      marginVertical: 10,
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SearchRecipeModal;
