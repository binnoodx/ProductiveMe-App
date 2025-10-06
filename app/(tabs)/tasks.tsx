import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import Todo from "../screens/forTasks/Todo";
import Goals from "../screens/forTasks/Goals";
import { Ionicons } from "@expo/vector-icons";

const TopTab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderColor: "#334155",
          elevation: 4,
          marginTop:25
        },
        tabBarIndicatorStyle: {
          backgroundColor: "blue",
          height: 2,
          borderRadius: 9999,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
          textTransform: "capitalize",
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "#cbd5e1", // slate-300
      }}
    >
      <TopTab.Screen
  name="Todo"
  component={Todo}
  options={{
    tabBarIcon: ({ color }) => (
      <Ionicons name="checkmark-done" size={18} color={color} />
    ),
  }}
/>
     <TopTab.Screen
  name="Goals"
  component={Goals}
  options={{
    tabBarIcon: ({ color }) => (
      <AntDesign name="bars" size={18} color={color} />
    ),
  }}
/>
    </TopTab.Navigator>
  );
}
