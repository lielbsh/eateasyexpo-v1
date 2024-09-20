import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Recipes = () => {
  return (
    <SafeAreaView className="bg-background-beige h-full">
      <View>
        <Text>Recipes</Text>
      </View>
    </SafeAreaView>
  )
}

export default Recipes