import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import Timer from "../screens/forTimer/Timer";
import Stopwatch from "../screens/forTimer/Stopwatch";
import Pomodoro from "../screens/forTimer/Pomodoro";
import Flipclock from "../screens/forTimer/Flipclock";
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
  name="Pomodoro"
  component={Pomodoro}
  options={{
    tabBarIcon: ({ color }) => (
      <Ionicons name="timer-sharp" size={18} color={color} />
    ),
  }}
/>
     <TopTab.Screen
  name="Flipclock"
  component={Flipclock}
  options={{
    tabBarIcon: ({ color }) => (
      <AntDesign name="barcode" size={18} color={color} />
    ),
  }}
/>
<TopTab.Screen
  name="Timer"
  component={Timer}
  options={{
    tabBarIcon: ({ color }) => (
      <AntDesign name="field-time" size={18} color={color} />
    ),
  }}
/>
<TopTab.Screen
  name="Stopwatch"
  component={Stopwatch}
  options={{
    tabBarIcon: ({ color }) => (
      <AntDesign name="stop" size={18} color={color} />
    ),
  }}
/>
    </TopTab.Navigator>
  );
}
