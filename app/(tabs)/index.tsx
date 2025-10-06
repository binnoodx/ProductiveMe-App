import { View, Text, ScrollView,Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { images } from '@/constants/image'
import { Link,useRouter } from 'expo-router'
import { getToken,removeToken } from '@/helper/tokenManager'
import { useEffect,useState } from 'react'
import { getTodo } from "@/helper/todoLocalStorage";
import { useFocusEffect } from '@react-navigation/native'



const index = () => {
  const Router=useRouter()
  const [token, setToken] = useState("")
  const [todos, setTodos] = useState([])

  const RemoveToken = async()=>{
    await removeToken("token")
    Router.replace("/(auth)/Login")
    setToken("")
  }

  const getTodos = async()=>{

    const todo = await getTodo("todo")
    if(todo){
      setTodos(todo)
    }


    


  }



  useFocusEffect(() => {
    const fetchToken = async () => {
      const token = await getToken()   
      if(!token){
        Router.replace("/(auth)/Login")
      }
      else{
        setToken(token)
        getTodos()

      }
      }
    fetchToken()
  })


  return (
    

  <ScrollView className='flex-1 bg-white'>

      <View className='top  w-full mt-8 mb-5 flex-row justify-evenly items-center'>

        {/* <TouchableOpacity onPress={RemoveToken}><Text>Clear Token</Text></TouchableOpacity> */}

        <Image source={images.logo} className='size-20'></Image>
        {/* <Text className='welcome_title font-extrabold text-orange-600 text-4xl'>Productive Me</Text> */}

        



      </View>


      <View className='second flex-1 flex-row h-[30vh] w-full justify-evenly items-center'>

        <View className='h-full w-[45vw] bg-[#ECEFF1]'>
          <Text className='mt-3 text-start italic text-slate-500 font-bold mx-2 text-sm overflow-scroll'>Today's Tasks : </Text>

          <ScrollView>
          

          <FlatList
                
                data={todos}
                renderItem={({item , index}) => (
                  <View className="mt-1 mx-1 flex-row justify-between ">
          
          
                    <Text className='mt-3 text-start ml-3 italic  text-slate-500 text-md'>{index+1}. {item} </Text>
          
                  </View>
          
          
          
          
                )}  
                >
          
                </FlatList>
          
          </ScrollView>


        </View>
        <View className='h-full w-[45vw] bg-[#ECEFF1]'>
          <Text className='mt-3 text-center italic text-slate-500 text-sm'>Goals September : </Text>
          <ScrollView>
          <Text className='mt-3 text-start ml-3 italic  text-slate-500 text-md'>1. AI/ML start </Text>
          <Text className='mt-3 text-start ml-3 italic text-slate-500 text-md'>2. Make good Protfolio </Text>
          <Text className='mt-3 text-start ml-3 italic text-slate-500 text-md'>3. Make Projects Websites </Text>
          <Text className='mt-3 text-start ml-3 italic text-slate-500 text-md'>4. Master Editing and Colour Grading </Text>
          </ScrollView>
        </View>

      </View>
            <View className='second mt-3 flex-1 flex-row gap-4 h-[30vh] w-full justify-center items-center'>

        <View className='h-full w-[94vw] bg-[#ECEFF1]'>
          <Text className='mt-3 text-center italic text-slate-500 text-sm'>Streaks : </Text>
        </View>
        </View>
            <View className='second mt-3 flex-1 flex-row gap-4 h-[30vh] w-full justify-center items-center'>

        <View className='h-full w-[94vw] bg-[#ECEFF1]'>
          <Text className='mt-3 text-center italic text-slate-500 text-sm'>Your Tasks : </Text>
        </View>
        

      </View>



  </ScrollView>



  )
}

export default index