// CartItem.jsx
import React, { useRef } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const CartItem = ({ item, isAtHome, onToggle, onDelete }) => {
  const animatedValue = useRef(new Animated.Value(0)).current; // Animation value

  const handleToggle = () => {
    onToggle(item.id, animatedValue); // Pass the animated value for toggling
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <View className="justify-between items-center">
          <TouchableOpacity
            onPress={() => onDelete(item.id)}
            className="justify-center items-center w-16"
            style={{
              height: '100%',
              justifyContent: 'center',
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <Ionicons name="trash" size={26} color="#ffffff" />
          </TouchableOpacity>
        </View>
      )}
    >
      <Animated.View
        style={{
          backgroundColor: isAtHome ? '#e0e0e0' : '#ffffff',
          opacity: isAtHome ? 0.5 : 1,
          transform: [{ translateY: animatedValue }],
        }}
        className="flex-row justify-between items-center p-3 mb-0.5 shadow-md"
      >
        <Text className={`text-lg font-semibold ${isAtHome ? 'text-gray-600' : 'text-black'}`}>
          {item.name}
        </Text>
        <TouchableOpacity onPress={handleToggle}>
          <Ionicons
            name={isAtHome ? 'checkmark-circle' : 'ellipse-outline'}
            size={32}
            color={isAtHome ? 'rgba(0, 128, 0, 0.5)' : 'purple'}
          />
        </TouchableOpacity>
      </Animated.View>
    </Swipeable>
  );
};

export default CartItem;
