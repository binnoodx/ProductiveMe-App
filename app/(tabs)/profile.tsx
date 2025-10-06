import React, { useState, useEffect } from "react";
import { TextInput, Button, View, Image, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { images } from "@/constants/image";
import { getToken } from "@/helper/tokenManager";
import { useRouter } from "expo-router";

export default function App() {
  const Router = useRouter()
  const [isLoading, setisLoading] = useState(false)
  const [token, setToken] = useState("")
  const [userName, setuserName] = useState("")
  const [userEmail, setUserEmail] = useState("")



  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken()
      if (!token) {
        Router.replace("/(auth)/Login")
      }
      else {
        const getDetail = async () => {

          setisLoading(true)

          const response = await fetch(`http://192.168.1.86:3000/api/my_detail`, {
            method: "POST",
            body: JSON.stringify({
              token: token
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })


          const detail = await response.json()

          console.log(detail.message)
          setisLoading(false)

          if (detail.status) {
            setUserEmail(detail.userEmail)
            setuserName(detail.userName)
          }
          else {
            console.log("User Not Found")
          }
        }
        getDetail()
      }
    }
    fetchToken()
  }, [])






  return (



    <ScrollView className="">

      <View className="mt-20">


        {
          isLoading ? <ActivityIndicator size={"large"} color={"black"} className=""></ActivityIndicator> : <View><Text>{userEmail}</Text>
            <Text>{userName}</Text></View>
        }



      </View>





    </ScrollView>







  );
}
