import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React from 'react'

const ConfirmationModal = ({ visible, onClose, onConfirm, title }) => {
    return (
        <Modal transparent={true} visible={visible}>
            <View className="flex-1 justify-center items-center bg-black opacity-80">
            <View className="bg-white opacity-100 rounded-lg p-4 w-80">
                <Text className="mt-2">{title}</Text>
                <View className="flex-row justify-end mt-4">
                <TouchableOpacity onPress={onClose} className="mr-5">
                    <View className="bg-gray-400 p-1 rounded-md shadow-md">
                        <Text className="font-semibold">Cancel</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onConfirm}>
                    <View className="bg-red p-1 rounded-md shadow-md">
                        <Text className="font-semibold">yes</Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>
    );
};

export default ConfirmationModal