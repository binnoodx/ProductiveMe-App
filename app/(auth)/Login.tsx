import { Text, View, TextInput, KeyboardAvoidingView, Image, Button, Alert, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { images } from "@/constants/image"
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { saveToken } from "@/helper/tokenManager";
import Config from "react-native-config";


const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
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

    setLoading(true)
    const response = await fetch(`http://10.0.0.43:3000/api/forLogin`, {
      method: "POST",
      body: JSON.stringify({
        userEmail: data.email,
        userPassword: data.password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const res = await response.json()
    setLoading(false)
    if (res.status) {
      await saveToken(res.token)
      Router.push("/(tabs)")
    }
    else {
      setApiErrors(res.message)
    }
  }

  return (
    <ScrollView className="">



      {IsKeyboardOn ? <View className="w-full justify-center items-center flex"><Image source={images.mobile} className="size-[8rem]" /></View> : <View className="w-full justify-center items-center flex"><Image source={images.mobile} className="size-[22rem]" /></View>}

      <Text className="text-3xl w-full text-center welcome_title">Welcome Back User</Text>

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
        {errors.email && <Text className="text-sm text-start w-full px-16 text-red-500 italic">{errors.email?.message}</Text>}


        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Provide a password"
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              secureTextEntry={!isChecked}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-slate-400 px-4 w-[80vw] bg-slate-50  text-black py-5 rounded-lg"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="password"
        />
        {errors.password && <Text className="text-sm text-start w-full px-16 text-red-500 italic">{errors.password.message}</Text>}
        {ApiErrors && <Text className="text-sm text-start w-full px-16 text-red-500 italic">{ApiErrors}</Text>}



        <View className="flex-row gap-1 items-center justify-start w-full px-12">
          <Checkbox
            className="scale-90"
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "tomato" : undefined}
          />
          <Text className="text-sm italic">Show Password</Text>
        </View>




{Loading ? <TouchableOpacity disabled className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 py-4'><ActivityIndicator size={"small"} color={"white"} /></TouchableOpacity>
          : <TouchableOpacity onPress={handleSubmit(onSubmit)} className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 py-4'><Text className='text-white w-full text-lg text-center font-semibold'>Login</Text></TouchableOpacity>
        }

        <Link href={"/Signup"}><Text className="text-md text-slate-400 italic">Don't have account ?</Text><Text className="text-md text-blue-500"> Create New Account</Text></Link>

        <Link href={"/(auth)/GetEmailForRecovery"}><Text className="text-md text-slate-400 italic">Forget password ?</Text><Text className="text-md text-blue-500"> Recover Now</Text></Link>




      </KeyboardAvoidingView>







    </ScrollView>
  )
}
export default Login