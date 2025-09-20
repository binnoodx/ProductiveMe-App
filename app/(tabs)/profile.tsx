import React, { useState } from "react";
import { TextInput, Button, View,Image, Text, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Signup from "../screens/forProfile/Signup";
import Login from "../screens/forProfile/Login";
import { images } from "@/constants/image";

export default function App() {
  const TopTab = createMaterialTopTabNavigator();



  return (

    

      <View className="h-screen bg-white">

           <View className='top w-full h-[10vh] items-center mt-5 flex-row justify-evenly'>

        <Image source={images.logo} className='size-24'></Image>




      </View>


      <TopTab.Navigator>
          <TopTab.Screen  name="Signup" component={Signup} />
          <TopTab.Screen name="Login" component={Login} />
        </TopTab.Navigator>


      </View>
      


    



  );
}
