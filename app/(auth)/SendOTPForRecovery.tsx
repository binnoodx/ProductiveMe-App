import { Text, View, TextInput, KeyboardAvoidingView, Image, Button, Alert, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { images } from "@/constants/image"
import Checkbox from "expo-checkbox";
import { useState, useEffect } from "react";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { saveToken } from "@/helper/tokenManager";
import { saveResetToken } from "@/helper/resetTokenManager";

const SendOTPForRecovery = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            otp: "",

        },
    })

    //Todo: Implement Feature of Resend Code

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
        const response = await fetch(`http://192.168.1.6:3000/api/recoverAccountOTP`, {
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

            await saveResetToken(res.token)
            Router.push("/(auth)/ResetPassword")

        }
        else {
            setApiErrors(res.message)
        }
    }

    return (
        <ScrollView className="">



            {IsKeyboardOn ? <View className="w-full justify-center items-center flex"><Image source={images.email} className="size-[8rem]" /></View> : <View className="w-full justify-center items-center flex"><Image source={images.email} className="size-[16rem]" /></View>}

            <Text className="text-xl italic text-slate-500  w-full text-center welcome_title">A 6-digit OTP have been sent to your Inbox.</Text>

            <KeyboardAvoidingView className="forInputs flex flex-col w-full mt-5 justify-center items-center gap-5">

                <Controller
                    control={control}
                    rules={{
                        required: {
                            value: true,
                            message: "Provide an OTP"
                        },
                        minLength: {
                            value: 6,
                            message: "OTP must be 6 Numbers"
                        },
                        maxLength: {
                            value: 6,
                            message: "OTP must be 6 Numbers"
                        },

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
                {errors.otp && <Text className="text-sm text-start w-full px-16 text-red-500 italic">OTP is required.</Text>}
                {ApiErrors && <Text className="text-sm text-start w-full px-16 text-red-500 italic">{ApiErrors}</Text>}



                {
                    Loading ? <TouchableOpacity disabled className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 
        py-4'><Text className='text-white w-full text-lg text-center font-semibold'><ActivityIndicator size={"small"} className="w-full justify-center items-center flex" color={"white"} /></Text></TouchableOpacity> :

                        <TouchableOpacity onPress={handleSubmit(onSubmit)} className='mt-3 bg-orange-400 w-[70vw] rounded-lg px-10 
        py-4'><Text className='text-white w-full text-lg text-center font-semibold'>Verify</Text></TouchableOpacity>
                }


            </KeyboardAvoidingView>







        </ScrollView>
    )
}
export default SendOTPForRecovery