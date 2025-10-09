import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { images } from '@/constants/image'
import { Link, useRouter } from 'expo-router'
import { Route } from 'expo-router/build/Route'
import { useEffect, useState } from 'react'
import { getToken } from '@/helper/tokenManager'
import { uri } from "@/constants/backend_uri";


const index = () => {

  const Router = useRouter()

  const [token, setToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
      const fetchToken = async () => {
        const token = await getToken() 
        setIsLoading(false)  
        if(token){

          Router.replace("/(tabs)")

        }       
      }
      fetchToken()
    }, [])



  const loginPush = () => {
    Router.push("/(auth)/Login")
  }

  return (
    <ScrollView>


      {
        isLoading ? <View className='h-screen w-screen flex justify-evenly items-center'>
          <Image className='size-[25rem]' source={images.WelcomeIllustration} />
          <Text className='font-extrabold text-3xl mt-3 mb-3 welcome_title font-serif'>Productive Me</Text>


          <View>
            <ActivityIndicator size={"large"} color={"black"} className=''></ActivityIndicator>
          <Text className='text-xl'>Checking Account</Text>
          </View>



        </View> :
          <View className='flex-1 justify-center items-center'>

            <Image className='size-[32rem]' source={images.WelcomeIllustration} />
            <Text className='font-bold text-lg'>Welcome to</Text>
            <Text className='font-extrabold text-6xl mt-3 welcome_title font-serif'>Productive Me</Text>

            <Text className='font-normal text-md mt-3 italic text-slate-500 '>Get started to make your day productive</Text>

            <TouchableOpacity onPress={loginPush} className='mt-10 bg-orange-400 w-[70vw] rounded-lg px-10 py-5'><Text className='text-white w-full text-lg text-center font-semibold'>Get Started</Text></TouchableOpacity>


          </View>
      }






    </ScrollView>
  )
}

export default index