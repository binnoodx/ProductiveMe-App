import { images } from "@/constants/image";
import React, { useState } from "react";
import { View,Text, StyleSheet, TextInput, Dimensions, ScrollView,Image,TouchableOpacity } from "react-native";



const journal = () => {
  const [text, setText] = useState("");

  return (
    <ScrollView className=" bg-white">
      <View className='top w-full h-[10vh] items-center mt-5 flex-row justify-evenly'>

        <Image source={images.logo} className='size-24'></Image>
        {/* <TouchableOpacity className="bg-green-500 px-5 py-2 rounded-sm"><Text className="text-slate-500 text-sm">See Previous Journals </Text></TouchableOpacity> */}




      </View>

      <View>
        <TextInput
          className="bg-[#ECEFF1] h-[80vh] mx-5 "
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



export default journal