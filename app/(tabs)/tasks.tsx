import React, { useState } from "react";
import { TextInput, Button, View,Image, Text, FlatList, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Todo from "../screens/forTasks/Todo";
import Goals from "../screens/forTasks/Goals";
import { images } from "@/constants/image";

export default function App() {
  const TopTab = createMaterialTopTabNavigator();



  return (
    

    <View className="h-screen ">


      <TopTab.Navigator className="mt-10">
          <TopTab.Screen  name="Todo " component={Todo} />
          <TopTab.Screen name="Goals" component={Goals} />

        </TopTab.Navigator>


      </View>


    
  );
}
