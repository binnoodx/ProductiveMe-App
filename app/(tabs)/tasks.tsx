import { View, Text, TextInput } from 'react-native'
import React from 'react'

const tasks = () => {
  return (
    <View>
      <TextInput className='bg-slate-300 mt-10 mx-10 py-5 px-5 rounded-lg ' placeholder='Add Task Now' placeholderTextColor={"black"} />
    </View>
  )
}

export default tasks