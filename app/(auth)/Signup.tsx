import { Text, View, TextInput, KeyboardAvoidingView, Image, Button, Alert, TouchableOpacity, ScrollView, Keyboard } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { images } from "@/constants/image"
import Checkbox from "expo-checkbox";
import { useState,useEffect } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName:"",
      userEmail: "",
      userPassword: "",
      conpass:""
    },
  })

  const [isChecked, setIsChecked] = useState(false)
  const [IsKeyboardOn, setIsKeyboardOn] = useState(false)
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
    const response = await fetch(`http://192.168.1.2:3000/api/forSignup`, {
      method: "POST",
      body: JSON.stringify({
        userEmail: data.userEmail,
        userName:data.userName,
        userPassword: data.userPassword
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const res = await response.json()
    if (res.status) {
      Router.push("/(auth)/Verify")   
    }
    else{
      console.log("Error From Frontend")
    }
  }

  return (
    <ScrollView className="">

      {IsKeyboardOn ? <View className="w-full justify-center items-center mt-12 flex"></View> : <View className="w-full justify-center items-center flex"><Image source={images.AuthIllustration} className="size-[16rem]" /></View>}
      <Text className="text-3xl w-full text-center welcome_title font-bold">Sign Up to Productive Me</Text>
      <KeyboardAvoidingView className="forInputs flex flex-col w-full mt-5 justify-center items-center gap-3">
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-slate-400 px-4 w-[80vw] bg-slate-50  text-black py-5 rounded-lg"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="userName"
        />

        <Controller
          control={control}
          rules={{
            required: true,
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
          name="userEmail"
        />
        {errors.userEmail && <Text className="text-sm text-start w-full px-16 text-red-500 italic">Email is required.</Text>}


        <Controller
          control={control}
          rules={{
            maxLength: 100,
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
          name="userPassword"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Confirm Password"
              secureTextEntry={!isChecked}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="border border-slate-400 px-4 w-[80vw] bg-slate-50  text-black py-5 rounded-lg"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="conpass"
        />

        <View className="flex-row gap-1 items-center justify-start w-full px-12">
          <Checkbox
            className="scale-90"
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "tomato" : undefined}
          />
          <Text className="text-sm italic">Show Password</Text>
        </View>




        <TouchableOpacity onPress={handleSubmit(onSubmit)} className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 py-4'><Text className='text-white w-full text-lg text-center font-semibold'>Signup</Text></TouchableOpacity>
        <Link href={"/Login"}><Text className="text-md text-slate-400 italic">Already have an account ?</Text><Text className="text-md text-blue-500"> Login</Text></Link>
        <Link href={"/Login"}><Text className="text-md text-slate-400 italic">Forget password ?</Text><Text className="text-md text-blue-500"> Recover Now</Text></Link>




      </KeyboardAvoidingView>







    </ScrollView>
  )
}
export default Signup