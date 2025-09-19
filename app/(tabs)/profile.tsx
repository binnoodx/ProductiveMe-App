import { Text, View, TextInput, Button, Alert, TouchableOpacity, ScrollView } from "react-native"
import { useForm, Controller } from "react-hook-form"


const profile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      conpass:""
    },
  })
  const onSubmit = (data: any) => console.log(data)


  return (
    <ScrollView className="bg-[#e5e8e9]">

      <View className="bg-white flex-1 mt-[30vh] mx-10 py-10 justify-center items-center gap-5">

        <Text className="text-black text-xl font-semibold mb-2">Sign In to Continue</Text>


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
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Confirm Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="bg-white border border-slate-400 px-4 w-[60vw]   text-black py-3 rounded-sm"
              placeholderTextColor={"#94a3b8"}
            />
          )}
          name="conpass"
        />


        <TouchableOpacity onPress={handleSubmit(onSubmit)} className="text-[#94a3b8] bg-green-400 w-[30vw] text-center px-5 py-2 rounded-sm font-semibold" ><Text className="w-full text-[#3f4245] text-center font-normal">Sign Up</Text></TouchableOpacity>
      </View>


    </ScrollView>
  )
}
export default profile