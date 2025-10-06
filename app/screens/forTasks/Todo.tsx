import { Text, View, TextInput, KeyboardAvoidingView, Image, Button, Alert, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator, FlatList, VirtualizedList } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { images } from "@/constants/image"
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { saveTodo,getTodo,deleteTodo } from "@/helper/todoLocalStorage";




const Todo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      todo: "",
    },
  })

  const [ApiErrors, setApiErrors] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [IsKeyboardOn, setIsKeyboardOn] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [todos, settodos] = useState(["Hey"])


  const Router = useRouter()

  useEffect(() => {

    getLocalTodo()
    
    


  }, []);

  const getLocalTodo = async()=>{
    const localTodo = await getTodo("todo")
    settodos([...todos,localTodo])
  }




  const onSubmit = async (data: any) => {

    if(data.todo){
      settodos([...todos,data.todo])
      await saveTodo(todos)
    }
  }

  


  return (
    <ScrollView className="h-screen">
      <View className="forInputs  flex flex-row w-screen mt-5 justify-center items-center gap-2">


        <Controller
          control={control}
          rules={{


          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Write your Todo for Today"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-slate-400 px-4 w-[70vw] bg-slate-50  text-black py-5 rounded-lg"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="todo"
        />
        {Loading ? <TouchableOpacity disabled className=' bg-orange-400 w-[10vw] rounded-lg px-10 py-4'><ActivityIndicator size={"small"} color={"white"} /></TouchableOpacity>
          : <TouchableOpacity onPress={handleSubmit(onSubmit)} className=' bg-orange-400 w-[20vw] rounded-lg  py-4'><Text className='text-white w-full text-lg text-center font-semibold'>Add</Text></TouchableOpacity>
        }
      </View>

      <FlatList
      
      data={todos}
      renderItem={({item}) => (



        <View className="mt-10 mx-10 flex-row justify-between ">


          <View>
            <Text className="text-md">{item}</Text>



          </View>

          <View className="flex-row gap-5">

            <TouchableOpacity><Text>Delete</Text></TouchableOpacity>
            <Text>Update</Text>


          </View>



        </View>




      )}  
      >

      </FlatList>


    </ScrollView>
  )
}
export default Todo