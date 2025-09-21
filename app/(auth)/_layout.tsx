import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { images } from '@/constants/image'



const _layout = () => {

    return (
        <Stack>


            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,                    
                }}

            />
             

            
            
        </Stack>
    )
}
export default _layout