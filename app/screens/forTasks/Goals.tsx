import { Text, View, TextInput, KeyboardAvoidingView, Image, Button, Alert, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { images } from "@/constants/image"
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { saveToken } from "@/helper/tokenManager";
import { getTodo } from "@/helper/todoLocalStorage";

const Goals = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      goal: "",
    },
  })

  const [ApiErrors, setApiErrors] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [IsKeyboardOn, setIsKeyboardOn] = useState(false)
  const [Loading, setLoading] = useState(false)
  const Router = useRouter()

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOn(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOn(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);




  const onSubmit = async (data: any) => {

    

    
    
    
  }

  return (
    <ScrollView className="">





      <View className="forInputs flex flex-row w-full mt-5 justify-center items-center gap-2">

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={`Write your goal for ${new Date().toLocaleString('default', { month: 'long' })}`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-slate-400 px-4 w-[70vw] bg-slate-50  text-black py-5 rounded-lg"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="goal"
        />
        {ApiErrors && <Text className="text-sm text-start w-full px-16 text-red-500 italic">{ApiErrors}</Text>}
        {Loading ? <TouchableOpacity disabled className=' bg-orange-400 w-[10vw] rounded-lg px-10 py-4'><ActivityIndicator size={"small"} color={"white"} /></TouchableOpacity>
          : <TouchableOpacity onPress={handleSubmit(onSubmit)} className=' bg-orange-400 w-[20vw] rounded-lg  py-4'><Text className='text-white w-full text-lg text-center font-semibold'>Add</Text></TouchableOpacity>
        }
      </View>

    </ScrollView>
  )
}
export default Goals