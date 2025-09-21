import { images } from "@/constants/image";
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Dimensions, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";



const WriteJournals = () => {
    const [text, setText] = useState("");
    const [isKeyOn, setisKeyOn] = useState(false)



    return (
        <ScrollView className=" bg-white mt-2">
            <View className="flex-col justify-start w-full items-center gap-5">
                <TouchableOpacity onPress={Keyboard.dismiss} className="bg-red-500 px-5 py-2 w-[10vw] rounded-sm"><Text>X</Text></TouchableOpacity>




                <TextInput
                    className="bg-[#ECEFF1] h-[60vh] mx-5 w-[80vw]"
                    value={text}
                    onChangeText={setText}
                    placeholder="What happened today ..."
                    placeholderTextColor="#999"
                    multiline
                    textAlignVertical="top"
                />
            </View>

        </ScrollView>
    );
}



export default WriteJournals