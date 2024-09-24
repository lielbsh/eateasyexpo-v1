import { View, Text, Modal, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import CustomSearchBar from './CustomSearchBar'
import { icons } from '../../constants';

const SearchModal = ({ _searchMode, _toggleSearchMode, _title }) => {
  return (
    <Modal visible={_searchMode} transparent={true} animationType="fade">
    <View className="flex-1 p-4 bg-background-beige opacity-95">
      <TouchableOpacity onPress={_toggleSearchMode}>
        <Image source={icons.logout} className="w-10 h-9 mt-[10%]" />
      </TouchableOpacity>
        <View className="my-4">
        <View className="flex-row items-center bg-background-shadow p-3 rounded-full shadow-sm opacity-[0.7]">
        <TextInput
            placeholder={_title}
            className="flex-1 color-offwhite text-bold"
            placeholderTextColor={'white'}
            maxLength={15}
        />
        <Image source={icons.search} className="w-6 h-6 mr-2" />
        </View>
    </View>
    </View>
  </Modal>
  )
}

export default SearchModal