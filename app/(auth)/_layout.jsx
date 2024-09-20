import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from "react";
import { useNavigationGuard } from '../../components/navigation/navigationGuard'; 
import SignUp from './sign-up';
const _layout = () => {
  return (

    <>
    <Stack>

      <Stack.Screen
        name='sign-in'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        >
          
        </Stack.Screen>
        
        <Stack.Screen
          name="verify"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="new-password"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

    <StatusBar backgroundColor="#161622" style="light"/>
    
    </>
  )
}

export default _layout