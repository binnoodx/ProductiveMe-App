import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/image'



const _layout = () => {

    const PillTabs = ({ focused, title, icon }: any) => {

        if (focused) {
            return (
                <>                   
                <ImageBackground
                    source={images.pill}
                        
                        className='flex flex-row w-full min-w-[102px] flex-1 mt-4 min-h-12 justify-center items-center rounded-full overflow-hidden'>
                        <Image source={icon} tintColor="#151312" className='size-5 ' />
                        <Text className='text-purple-700 ml-2 font-semibold'>{title}</Text>
                    </ImageBackground>
                </>
            )
        }
        else{
            return(
                <>
                <View className=' flex-1 items-center mt-3'>
                    <Image source={icon} className='size-5'></Image>
                </View>
                </>
            )
        }

    }


    return (
        <Tabs screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                backgroundColor:"#",
                
            }
        }}>

            
            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <>
                            <PillTabs focused={focused} icon={images.home}  title="Home" />
                        </>
                    )
                }}
            />


            <Tabs.Screen
                name='tasks'
                options={{
                    headerShown: false,
                    title: "task",
                    tabBarIcon: ({ focused }) => (
                        <>

                            <PillTabs focused={focused} icon={images.task} title="Tasks" />

                        </>
                    )
                }}

            />
            <Tabs.Screen

                name='Journals'
                options={{
                    headerShown: false,
                    title: "journal",
                    tabBarIcon: ({ focused }) => (
                        <>

                            <PillTabs focused={focused} icon={images.journal} title="Journals" />

                        </>
                    )
                }}

            />
            <Tabs.Screen
                name='timer'
                options={{
                    headerShown: false,
                    title: "timer",
                    tabBarIcon: ({ focused }) => (
                        <>

                            <PillTabs focused={focused} icon={images.timer} title="Timer" />
                        </>
                    )
                }}

            />
        </Tabs>
    )
}
export default _layout