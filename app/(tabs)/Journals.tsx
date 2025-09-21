import React, { useState } from "react";
import { TextInput, Button, View, Image, Text, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WriteJournals from "../screens/forJournals/WriteJournal";
import ViewJournals from "../screens/forJournals/ViewJournals";
import { images } from "@/constants/image";


export default function App() {
  const TopTab = createMaterialTopTabNavigator();




  return (


    <View className="h-screen bg-white">

      <View className='top w-full h-[10vh] items-center mt-5 flex-row justify-evenly'>

        <Image source={images.logo} className='size-24'></Image>
              </View>


      <TopTab.Navigator>
        <TopTab.Screen name="Write New Journal" component={WriteJournals} />
        <TopTab.Screen name="View Older Journals" component={ViewJournals} />
      </TopTab.Navigator>


    </View>



  );
}
