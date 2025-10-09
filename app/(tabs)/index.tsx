import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { images } from '@/constants/image'
import { Link, useRouter } from 'expo-router'
import { getToken, removeToken } from '@/helper/tokenManager'
import { useEffect, useState } from 'react'
import { getTodo } from "@/helper/todoLocalStorage";
import { useFocusEffect } from '@react-navigation/native'
import { getGoals } from '@/helper/goalsLocalStorage'

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}
interface GoalItem {
  id: number;
  text: string;
  completed: boolean;
}

const index = () => {
  const Router = useRouter()
  const [token, setToken] = useState("")
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [Goals, setGoals] = useState<GoalItem[]>([]);


  const RemoveToken = async () => {
    await removeToken("token")
    Router.replace("/(auth)/Login")
    setToken("")
  }

  const getTodos = async () => {

    const todo = await getTodo()
    if (todo) {
      setTodos(todo)
    }

  }
  const fetchGoals = async () => {

    const recievedGoal = await getGoals()
    if (recievedGoal) {
      setGoals(recievedGoal)
    }

  }



  useFocusEffect(() => {
    const fetchToken = async () => {
      const token = await getToken()
      if (!token) {
        Router.replace("/(auth)/Login")
      }
      else {
        setToken(token)
        getTodos()
        fetchGoals()

      }
    }
    fetchToken()
  })


  return (


    <ScrollView className='flex-1 bg-white'>
      <View className='top  w-full mt-8 mb-5 flex-row justify-evenly items-center'>
        <Image source={images.logo} className='size-20'></Image>

      </View>


      <View className='second flex-1 flex-row h-[30vh] w-full justify-evenly items-center'>


        {/* For Todos */}
        <View className='h-full w-[45vw] bg-[#ECEFF1]'>
          <Text className='mt-3 text-start italic text-slate-500 font-bold mx-2 text-sm overflow-scroll'>Today's Tasks : </Text>

          <ScrollView>


            {
              todos.length != 0 ? <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View className="mt-2  flex-row gap-2 justify-between items-center border-b border-slate-200 ">


                    <Text
                      className={`text-md mt-3 mx-3 flex-1  ${item.completed ? "line-through text-gray-400" : "text-black"}`}
                    >
                      {index + 1}. {item.text}
                    </Text>


                  </View>
                )}
              /> : <View className='h-[20vh] w-[45vw] justify-center items-center flex-1'>

                <Text className='font-semibold  text-blue-500' >Add Today's Task</Text>



              </View>
            }

          </ScrollView>


        </View>



        {/* For Goals */}
        <View className='h-full w-[45vw] bg-[#ECEFF1]'>
          <Text className='mt-3 text-start italic text-slate-500 font-bold mx-2 text-sm overflow-scroll'>Goals for {new Date().toLocaleString('default', { month: 'long' , year:'numeric'  })} </Text>

          <ScrollView>
            {
              Goals.length != 0 ? <FlatList
                data={Goals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View className="mt-2  flex-row gap-2 justify-between items-center border-b border-slate-200 ">


                    <Text
                      className={`text-md mt-3 mx-3 flex-1  ${item.completed ? "line-through text-gray-400" : "text-black"}`}
                    >
                      {index + 1}. {item.text}
                    </Text>


                  </View>
                )}
              /> : <View className='h-[20vh] w-[45vw] justify-center items-center flex-1'>

                <Text className='font-semibold  text-blue-500' >Add Today's Goal</Text>



              </View>
            }

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