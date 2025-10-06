import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import WriteJournals from "../screens/forJournals/WriteJournal";
import ViewJournals from "../screens/forJournals/ViewJournals";
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
  name="New Journal"
  component={WriteJournals}
  options={{
    tabBarIcon: ({ color }) => (
      <Ionicons name="pencil" size={18} color={color} />
    ),
  }}
/>
     <TopTab.Screen
  name="All Journals"
  component={ViewJournals}
  options={{
    tabBarIcon: ({ color }) => (
      <AntDesign name="ordered-list" size={18} color={color} />
    ),
  }}
/>
    </TopTab.Navigator>
  );
}
