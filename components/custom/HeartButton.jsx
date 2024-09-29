import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Adjust import based on the icon library you are using

const HeartButton = ({ onPress }) => {
    const [liked, setLiked] = useState(false);

    const toggleLike = () => {
        setLiked(!liked);
        if (onPress) {
            onPress(); 
        }
    };

    return (
        <TouchableOpacity 
            onPress={toggleLike} 
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md"
                
        >
            <Icon 
                name={liked ? 'heart' : 'heart-outline'} 
                size={20} // Size of the heart icon
                color={liked ? '#F1684B' : '#ccc'} 
            />
        </TouchableOpacity>
    );
};

export default HeartButton;
