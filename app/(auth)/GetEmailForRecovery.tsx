import { Text, View, TextInput, KeyboardAvoidingView, Image, Button, Alert, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { images } from "@/constants/image"
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { saveToken } from "@/helper/tokenManager";

const GetEmailForRecovery = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",

    },
  })

  const [ApiError, setApiError] = useState("")
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
    setLoading(true)
    const response = await fetch(`http://10.0.0.43:3000/api/GetEmailForRecovery`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const res = await response.json()
    setLoading(false)
    if (res.status) {
      Router.push("/(auth)/SendOTPForRecovery")
    }
    else {
      setApiError(res.message)

    }
  }

  return (
    <ScrollView className="">



      {IsKeyboardOn ? <View className="w-full justify-center items-center flex"><Image source={images.email} className="size-[8rem]" /></View> : <View className="w-full justify-center items-center flex"><Image source={images.email} className="size-[16rem]" /></View>}

      <Text className="text-xl italic text-slate-500  w-full text-center welcome_title">Enter Email to Recover</Text>

      <KeyboardAvoidingView className="forInputs flex flex-col w-full mt-5 justify-center items-center gap-5">

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Provide an Email"
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address"
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-slate-400 px-4 w-[80vw] bg-slate-50  text-black py-5 rounded-lg"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="email"
        />
        {errors.email && <Text className="text-sm text-start w-full px-16 text-red-500 italic">{errors.email.message}</Text>}
        {ApiError &&<Text className="text-sm text-start w-full px-16 text-red-500 italic">{ApiError}</Text> }









               {
          Loading ? <TouchableOpacity disabled className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 
        py-4'><Text className='text-white w-full text-lg text-center font-semibold'><ActivityIndicator size={"small"} className="w-full justify-center items-center flex" color={"white"} /></Text></TouchableOpacity> :
        
        <TouchableOpacity onPress={handleSubmit(onSubmit)} className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 
        py-4'><Text className='text-white w-full text-lg text-center font-semibold'>Continue</Text></TouchableOpacity>
        }






      </KeyboardAvoidingView>







    </ScrollView>
  )
}
export default GetEmailForRecovery