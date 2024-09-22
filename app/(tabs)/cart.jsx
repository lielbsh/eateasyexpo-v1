import { View, Text, FlatList, Animated, TextInput, TouchableOpacity, SafeAreaView, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import { Feather, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { TouchableWithoutFeedback, Keyboard } from 'react-native-web';
import CustomSearchBar from '../../components/CustomSearchBar';
import { icons } from '../../constants';



const Cart = () => {
  const [searchMode, setSearchMode] = useState(false);
  const [animatedScale] = useState(new Animated.Value(1));

   // Toggle Search Mode and Trigger Animation
   const toggleSearchMode = () => {
    setSearchMode(!searchMode);
    Animated.spring(animatedScale, {
      toValue: searchMode ? 1 : 1.5,  // Scale up or down
      friction: 3,
      useNativeDriver: true,  // Optimize performance
    }).start();
  };


  // Animated style for scaling
  const animatedStyle = {
    transform: [{ scale: animatedScale }],
  };

  const [listData, setListData] = useState([
    {"id":1,"name":"Angelica","name_scientific":"Angelica keiskei","description":"Angelica is a genus of about 60 species of tall biennial and perennial herbs in the family Apiaceae, native to temperate and subarctic regions of the Northern Hemisphere, reaching as far north as Iceland and Lapland. They grow to 1–3 m tall, with large bipinnate leaves and large compound umbels of white or greenish-white flowers. Some species can be found in purple moor and rush pastures.","itis_id":"","wikipedia_id":"Angelica","picture_file_name":"1.jpg","picture_content_type":"image/jpeg","picture_file_size":111325,"picture_updated_at":"2012-04-20T09:29:57.000Z","legacy_id":1,"food_group":"Herbs and Spices","food_subgroup":"Herbs","food_type":"Type 1","created_at":"2011-02-09T00:37:14.000Z","updated_at":"2019-05-14T18:04:13.000Z","creator_id":null,"updater_id":2,"export_to_afcdb":false,"category":"specific","ncbi_taxonomy_id":357850,"export_to_foodb":true,"public_id":"FOOD00001"}, {"id":2,"name":"Savoy cabbage","name_scientific":"Brassica oleracea var. sabauda","description":"Savoy cabbage (Brassica oleracea convar. capitata var. sabauda L. ) is a variety of the cabbage, a cultivar of the plant species Brassica oleracea. Savoy cabbage is a winter vegetable. A variety of the savoy cabbage is the January King Cabbage. Savoy cabbage can be used in a variety of recipes. It pairs well with red wine, apples, spices, horseradish and meat. It can be used for roulades, in stews and soups, as well as roasted plain and drizzled with olive oil. Cabbage that is heavy for its size with leaves that are unblemished and have a bright, fresh look are signs of desirable quality. Whole cabbages are preferred whenever possible as pre-cut or preshredded cabbage has a greatly diminished vitamin content. Peak season for most cabbages runs from November through April. Fresh whole cabbage will keep in the refrigerator for one to six weeks depending on type and variety. Hard green, white or red cabbages will keep the longest while the looser Savoy and Chinese varieties need to be consumed more quickly. It is necessary to keep the outer leaves intact without washing when storing since moisture hastens decay. Cabbage provides fiber, vitamins A, C, K and B6, folate, potassium, manganese, thiamin, calcium, iron and magnesium.","itis_id":null,"wikipedia_id":"Savoy cabbage","picture_file_name":"2.jpg","picture_content_type":"image/jpeg","picture_file_size":155178,"picture_updated_at":"2012-04-20T09:39:54.000Z","legacy_id":2,"food_group":"Vegetables","food_subgroup":"Cabbages","food_type":"Type 1","created_at":"2011-02-09T00:37:15.000Z","updated_at":"2019-05-14T18:04:13.000Z","creator_id":null,"updater_id":null,"export_to_afcdb":false,"category":"specific","ncbi_taxonomy_id":1216010,"export_to_foodb":true,"public_id":"FOOD00002"}, {"id":3,"name":"Silver linden","name_scientific":"Tilia argentea","description":"Tilia tomentosa (Silver Lime in the UK and Silver Linden in the US) is a species of Tilia native to southeastern Europe and southwestern Asia, from Hungary and the Balkans east to western Turkey, occurring at moderate altitudes. It is a deciduous tree growing to 20–35 m tall, with a trunk up to 2 m diameter. The leaves are alternately arranged, rounded to triangular-ovate, 4–13 cm long and broad with a 2.5–4 cm petiole, green and mostly hairless above, densely white tomentose with white hairs below, and with a coarsely toothed margin. The flowers are pale yellow, hermaphrodite, produced in cymes of three to ten in mid to late summer with a pale green subtending leafy bract; they have a strong scent and are pollinated by honeybees. The nectar however contains sugars which cannot be digested by other bees, to whom the tree is somewhat toxic. The fruit is a dry nut-like drupe 8–10 mm long, downy, and slightly ribbed.","itis_id":"845789","wikipedia_id":"Tilia tomentosa","picture_file_name":"3.jpg","picture_content_type":"image/jpeg","picture_file_size":56367,"picture_updated_at":"2012-04-20T09:41:25.000Z","legacy_id":3,"food_group":"Herbs and Spices","food_subgroup":"Herbs","food_type":"Type 1","created_at":"2011-02-09T00:37:15.000Z","updated_at":"2019-05-17T16:19:45.000Z","creator_id":null,"updater_id":null,"export_to_afcdb":false,"category":"specific","ncbi_taxonomy_id":null,"export_to_foodb":true,"public_id":"FOOD00003"}, {"id":4,"name":"Kiwi","name_scientific":"Actinidia chinensis","description":"The kiwifruit, often shortened to kiwi in many parts of the world, is the edible berry of a woody vine in the genus Actinidia. The most common cultivar group of kiwifruit ('Hayward') is oval, about the size of a large hen's egg (5?8 centimetres in length and 4.5?5.5 centimetres in diameter). It has a fibrous, dull greenish-brown skin and bright green or golden flesh with rows of tiny, black, edible seeds. The fruit has a soft texture and a sweet but unique flavor, and today is a commercial crop in several countries, such as Italy, New Zealand, Chile, Greece and France.","itis_id":"506775","wikipedia_id":"Kiwifruit","picture_file_name":"4.jpg","picture_content_type":"image/jpeg","picture_file_size":110661,"picture_updated_at":"2012-04-20T09:32:21.000Z","legacy_id":4,"food_group":"Fruits","food_subgroup":"Tropical fruits","food_type":"Type 1","created_at":"2011-02-09T00:37:15.000Z","updated_at":"2019-05-14T18:04:13.000Z","creator_id":null,"updater_id":null,"export_to_afcdb":false,"category":"specific","ncbi_taxonomy_id":3625,"export_to_foodb":true,"public_id":"FOOD00004"}, {"id":5,"name":"Allium","name_scientific":"Allium","description":"Allium haematochiton is a species of wild onion known by the common name redskin onion. It is native to northern Baja California and southern California. It it grows on the slopes of the coastal hills and mountains, such as those of the Peninsular Ranges, Transverse Ranges, and southern California Coast Ranges.","itis_id":"42634","wikipedia_id":"Allium haematochiton","picture_file_name":"5.jpg","picture_content_type":"image/jpeg","picture_file_size":341911,"picture_updated_at":"2012-04-20T09:37:44.000Z","legacy_id":5,"food_group":"Vegetables","food_subgroup":"Onion-family vegetables","food_type":"Type 1","created_at":"2011-02-09T00:37:15.000Z","updated_at":"2019-05-14T18:04:13.000Z","creator_id":null,"updater_id":null,"export_to_afcdb":false,"category":"specific","ncbi_taxonomy_id":4678,"export_to_foodb":true,"public_id":"FOOD00005"}, {"id":6,"name":"Garden onion","name_scientific":"Allium cepa","description":"The onion (Allium cepa) (Latin 'cepa' = onion), also known as the bulb onion or common onion, is used as a vegetable and is the most widely cultivated species of the genus Allium. This genus also contains several other species variously referred to as onions and cultivated for food, such as the Japanese bunching onion (A. fistulosum), the Egyptian onion (A. ×proliferum), and the Canada onion (A. canadense). The name \"wild onion\" is applied to a number of Allium species but A. cepa is exclusively known from cultivation and its ancestral wild original form is not known, although escapes from cultivation have become established in some regions.The onion is most frequently a biennial or a perennial plant, but is usually treated as an annual and harvested in its first growing season.\r\nOnions are cultivated and used around the world. As a foodstuff they are usually served cooked, as a vegetable or part of a prepared savoury dish, but can also be eaten raw or used to make pickles or chutneys. They are pungent when chopped and contain certain chemical substances which irritate the eyes. Onions contain phenolics and flavonoids that have potential anti-inflammatory, anti-cholesterol, anticancer and antioxidant properties.","itis_id":"42720","wikipedia_id":"Onion","picture_file_name":"6.jpg","picture_content_type":"image/jpeg","picture_file_size":138437,"picture_updated_at":"2012-04-20T09:41:21.000Z","legacy_id":6,"food_group":"Vegetables","food_subgroup":"Onion-family vegetables","food_type":"Type 1","created_at":"2011-02-09T00:37:15.000Z","updated_at":"2019-05-14T18:04:13.000Z","creator_id":null,"updater_id":null,"export_to_afcdb":true,"category":"specific","ncbi_taxonomy_id":4679,"export_to_foodb":true,"public_id":"FOOD00006"}, {"id":7,"name":"Leek","name_scientific":"Allium porrum","description":"The leek is a vegetable that belongs, along with onion and garlic, to the genus Allium, currently placed in family Amaryllidaceae, subfamily Allioideae. Historically many scientific names were used for leeks, which are now treated as cultivars of Allium ampeloprasum. Two related vegetables, elephant garlic and kurrat, are also cultivars of A.  ampeloprasum, although different in their uses as food. The edible part of the leek plant is a bundle of leaf sheaths that is sometimes erroneously called a stem or stalk.","itis_id":"42659","wikipedia_id":"Leek","picture_file_name":"7.jpg","picture_content_type":"image/jpeg","picture_file_size":4857,"picture_updated_at":"2012-04-20T09:33:40.000Z","legacy_id":7,"food_group":"Vegetables","food_subgroup":"Onion-family vegetables","food_type":"Type 1","created_at":"2011-02-09T00:37:15.000Z","updated_at":"2019-05-14T18:04:13.000Z","creator_id":null,"updater_id":null,"export_to_afcdb":false,"category":"specific","ncbi_taxonomy_id":null,"export_to_foodb":true,"public_id":"FOOD00007"}
  ])

  const renderItem = ({ item }) => (
    <View className="flex-row justify-between items-center p-3 mb-4 bg-white rounded-[20px] shadow-md">
      <View>
        <Text className="text-lg font-semibold">{item.name}</Text>
        <Text className="text-gray-600">{item.id}</Text>
      </View>
      <Ionicons name="checkmark-circle" size={32} color="green" />
    </View>
  );


  return (
    <SafeAreaView className="bg-background-beige flex-1 ">
      <Header />
      <View className="p-4 flex-1">
        <Text className="text-2xl font-bold text-center text-red mb-1 mt-[-10px]">You need to buy</Text>

        {/* Modal for search window */}
        <Modal visible={searchMode} transparent={true} animationType="fade" >
          <View className="flex-1 p-4 bg-background-beige opacity-95 mt-[40px]">
            <TouchableOpacity onPress={toggleSearchMode}>
              <Image source={icons.logout} className="w-10 h-9" />
            </TouchableOpacity>
            <CustomSearchBar />
          </View>
        </Modal>

        <FlatList
          data={listData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />

        {/* Floating Action Button with Animation */}
        <View className="absolute bottom-10 right-5">
          <TouchableOpacity onPress={toggleSearchMode}>
            <Animated.View style={[animatedStyle, { backgroundColor: '#F1684B', borderRadius: 50, padding: 10 }]}>
              <Feather name="plus" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;