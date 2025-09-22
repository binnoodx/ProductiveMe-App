import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/image'
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';





const _layout = () => {

    const PillTabs = ({ focused, title, icon }: any) => {

        if (focused) {
            return (
                <>

                    <View className=' items-center mt-2 w-screen'>
                        <View className='flex justify-center items-center'>

                            <Image source={icon} className='size-6' tintColor={"blue"}></Image>
                            <Text className='text-md text-blue-500 font-bold italic'>{title}</Text>

                        </View>
                    </View>

                </>
            )
        }
        else {
            return (
                <>
                    <View className=' flex-1 items-center mt-2'>
                        <Image source={icon} className='size-5' ></Image>
                    </View>
                </>
            )
        }

    }


    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: "#ffffff",

            }
        }}>


            <Tabs.Screen
                name='index'
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <>
                            <PillTabs focused={focused} icon={images.home} title="Home" />
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
            <Tabs.Screen
                name='profile'
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <>

                            <PillTabs focused={focused} icon={images.profile} title="Profile" />
                        </>
                    )
                }}

            />
        </Tabs>
    )
}
export default _layout