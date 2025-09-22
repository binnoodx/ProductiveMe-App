import { Text, View, TextInput, KeyboardAvoidingView, Image, Button, Alert, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { images } from "@/constants/image"
import Checkbox from "expo-checkbox";
import { useState,useEffect } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { saveToken } from "@/helper/tokenManager";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
      
    },
  })

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
    setLoading(true)
    const response = await fetch(`http://192.168.1.2:3000/api/forOTP`, {
      method: "POST",
      body: JSON.stringify({
        otp: data.otp,
        
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const res = await response.json()
    setLoading(false)
    if (res.status) {
      await saveToken(res.token)
      
      console.log("Sent token is ",res.token)
      Router.push("/(tabs)")
    }
  }

  return (
    <ScrollView className="">



      {IsKeyboardOn ? <View className="w-full justify-center items-center flex"><Image source={images.AuthIllustration} className="size-[8rem]" /></View> : <View className="w-full justify-center items-center flex"><Image source={images.AuthIllustration} className="size-[22rem]" /></View>}

      <Text className="text-xl italic text-slate-400  w-full text-center welcome_title">A 6-digit OTP have been sent to your Inbox.</Text>

      <KeyboardAvoidingView className="forInputs flex flex-col w-full mt-5 justify-center items-center gap-5">

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="OTP"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-slate-400 px-4 w-[80vw] bg-slate-50  text-black py-5 rounded-lg"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="otp"
        />
        {errors.otp && <Text className="text-sm text-start w-full px-16 text-red-500 italic">Email is required.</Text>}


       

        




        <TouchableOpacity onPress={handleSubmit(onSubmit)} className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 
        py-4'><Text className='text-white w-full text-lg text-center font-semibold'>{Loading ? <ActivityIndicator size={"small"} className="w-full justify-center items-center flex" color={"white"} />:"Login"}</Text></TouchableOpacity>
       
       
        <Link href={"/Signup"}><Text className="text-md text-slate-400 italic">Don't have account ?</Text><Text className="text-md text-blue-500"> Create New Account</Text></Link>
       
        <Link href={"/Signup"}><Text className="text-md text-slate-400 italic">Forget password ?</Text><Text className="text-md text-blue-500"> Recover Now</Text></Link>




      </KeyboardAvoidingView>







    </ScrollView>
  )
}
export default Login