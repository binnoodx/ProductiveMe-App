import React, { useState } from "react";
import { TextInput, Button, View,Image, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Timer from "../screens/forTimer/Timer";
import Stopwatch from "../screens/forTimer/Stopwatch";
import Pomodoro from "../screens/forTimer/Pomodoro";
import Flipclock from "../screens/forTimer/Flipclock";
import { images } from "@/constants/image";

export default function App() {
  const TopTab = createMaterialTopTabNavigator();



  return (

    

      <View className="h-screen bg-white">

           <View className='top w-full h-[10vh] items-center mt-5 flex-row justify-evenly'>

        <Image source={images.logo} className='size-24'></Image>




      </View>


      <TopTab.Navigator>
          <TopTab.Screen  name="Pomodoro" component={Pomodoro} />
          <TopTab.Screen name="Flipclock" component={Flipclock} />
          <TopTab.Screen  name="Timer" component={Timer} />
          <TopTab.Screen name="Stopwatch" component={Stopwatch} />
        </TopTab.Navigator>


      </View>
      


    



  );
}
