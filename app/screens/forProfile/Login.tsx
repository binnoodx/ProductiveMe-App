import { Text, View, TextInput, Button, Alert, TouchableOpacity, ScrollView } from "react-native"
import { useForm, Controller } from "react-hook-form"



const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = async (data: any) => {


    const response = await fetch(`http://192.168.1.7:3000/api/forLogin`, {
      method: "POST",
      body: JSON.stringify({
        userEmail: data.email,
        userPassword: data.password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    const res = await response.json()
    if (res.status) {
      // Save token in localStorage
      localStorage.setItem("token", data.token);
       // redirect to protected page
    }
    }






  const WhoAmI = async()=>{
    const response = await fetch("http://192.168.1.7:3000/api/my_detail")
    const res = await response.json()
    console.log(res)
  }







  return (
    <View className="bg-white flex-1 justify-center items-center">

      <View className="bg-white flex px-10 py-10  mx-10  justify-center items-center gap-5">





        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="bg-white border border-slate-400 px-4 w-[60vw]   text-black py-3 rounded-sm"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}


        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="bg-white border border-slate-400 px-4 w-[60vw]   text-black py-3 rounded-sm"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="password"
        />
        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="text-[#94a3b8] bg-green-400 w-[30vw] text-center px-5 py-2 rounded-sm font-semibold" ><Text className="w-full text-[#3f4245] text-center font-normal">Login</Text></TouchableOpacity>

      </View>


    </View>
  )
}
export default Login