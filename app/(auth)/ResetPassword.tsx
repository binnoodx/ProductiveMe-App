import { Text, View, TextInput, KeyboardAvoidingView, Image, Button, Alert, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { images } from "@/constants/image"
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { getResetToken } from "@/helper/resetTokenManager";

const ResetPassword = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            pass: "",
            conPass: ""

        },
    })
    const [isChecked, setIsChecked] = useState(false)
    const [ApiErrors, setApiErrors] = useState("")
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
        const ResetToken = await getResetToken()
        const response = await fetch(`http://192.168.1.6:3000/api/changePassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ResetToken}`
            },
            body: JSON.stringify({
                password: data.pass
            })
        });
        const res = await response.json()
        setLoading(false)
        if (res.status) {
            Router.push("/(auth)/Login")
        }
        else {
            console.log(res.message)
        }
    }

    return (
        <ScrollView className="">



            {IsKeyboardOn ? <View className="w-full justify-center items-center flex"><Image source={images.password} className="size-[8rem]" /></View> : <View className="w-full justify-center items-center flex"><Image source={images.password} className="size-[16rem]" /></View>}

            <Text className="text-xl italic text-slate-500  w-full text-center welcome_title">Change Your Password</Text>

            <KeyboardAvoidingView className="forInputs flex flex-col w-full mt-5 justify-center items-center gap-5">

                <Controller
                    control={control}
                    rules={{
                        minLength: {
                            value: 6,
                            message: "Password must be greater than 6 Letters"
                        },
                        required: {
                            value: true,
                            message: "Password is required."
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Password"
                            onBlur={onBlur}
                            secureTextEntry={!isChecked}
                            onChangeText={onChange}
                            value={value}
                            className="border border-slate-400 px-4 w-[80vw] bg-slate-50  text-black py-5 rounded-lg"
                            placeholderTextColor={"#94a3b8"}
                        />
                    )}
                    name="pass"
                />
                {errors.pass && <Text className="text-sm text-start w-full px-16 text-red-500 italic">{errors.pass?.message}</Text>}

                <Controller
                    control={control}
                    rules={{

                        required: {
                            value: true,
                            message: "Confirm Your Password"
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder="Confirm Password"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            secureTextEntry={!isChecked}

                            value={value}
                            className="border border-slate-400 px-4 w-[80vw] bg-slate-50  text-black py-5 rounded-lg"
                            placeholderTextColor={"#94a3b8"}
                        />
                    )}
                    name="conPass"
                />
                {errors.conPass && <Text className="text-sm text-start w-full px-16 text-red-500 italic">{errors.conPass?.message}</Text>}
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








                <TouchableOpacity onPress={handleSubmit(onSubmit)} className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 
        py-4'><Text className='text-white w-full text-lg text-center font-semibold'>{Loading ? <ActivityIndicator size={"small"} className="w-full justify-center items-center flex" color={"white"} /> : "Change"}</Text></TouchableOpacity>


                




            </KeyboardAvoidingView>







        </ScrollView>
    )
}
export default ResetPassword