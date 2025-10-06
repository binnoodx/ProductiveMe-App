import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { images } from '@/constants/image'
import Toast from "react-native-toast-message";




const _layout = () => {

    return (
        <Stack>

            <Toast topOffset={50} bottomOffset={80} />


            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,                    
                }}

            />    
            <Stack.Screen
                name='Login'
                options={{
                    headerShown: false,                    
                }}

            /> 
            <Stack.Screen
                name='Signup'
                options={{
                    headerShown: false,                    
                }}

            />   
            <Stack.Screen
                name='Verify'
                options={{
                    headerShown: false,                    
                }}

            />   
            <Stack.Screen
                name='GetEmailForRecovery'
                options={{
                    headerShown: false,                    
                }}

            /> 
            <Stack.Screen
                name='SendOTPForRecovery'
                options={{
                    headerShown: false,                    
                }}

            /> 
            <Stack.Screen
                name='ResetPassword'
                options={{
                    headerShown: false,                    
                }}

            /> 
        </Stack>
    )
}
export default _layout