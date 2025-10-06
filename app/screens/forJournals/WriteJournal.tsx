import { images } from "@/constants/image";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Dimensions, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";



const WriteJournals = () => {
    const [text, setText] = useState("");



    return (
        <ScrollView className=" bg-white mt-2">
            <View className="flex-col justify-start w-full items-center gap-5">




                <TextInput
                    className="bg-[#e1e78c] h-auto px-5 py-10 rounded-md mt-10 w-[80vw]"
                    value={text}
                    onChangeText={setText}

                    
                    placeholder={`${new Date().toLocaleString('default', { month: 'long' , day:"2-digit",year:"numeric" })}\n${new Date().toLocaleString('default', { weekday:"long" })}\n${new Date().toLocaleString('default', { hour12:true , hour:"2-digit" , minute:"2-digit" })}`}



                    placeholderTextColor="#000"
                    multiline
                    textAlignVertical="top"
                />
            </View>

        </ScrollView>
    );
}



export default WriteJournals