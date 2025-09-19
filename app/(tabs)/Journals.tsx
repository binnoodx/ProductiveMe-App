import React, { useState } from "react";
import { View, StyleSheet, TextInput, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const journal = () => {
  const [text, setText] = useState("");

  return (
    <View style={styles.container} className="h-[80vh] bg-slate-600">
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="What happened today?."
        placeholderTextColor="#999"
        multiline
        textAlignVertical="top" // 👈 ensures typing starts from the top
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    backgroundColor: "#fff",
  },
  textInput: {
    height: height * 0.9, // almost full phone height
    padding: 16,
    fontSize: 18,
    textAlignVertical: "top", // 👈 key to align text at the top
  },
});

export default journal