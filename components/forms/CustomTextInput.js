import { StyleSheet, TextInput } from "react-native";
import React from "react";

export default function CustomTextInput(props) {
  const { placeholder, onChange, value, type } = props;
  return (
    <TextInput
      style={styles.input}
      value={value}
      placeholder={placeholder}
      onChangeText={onChange}
      keyboardType={type}
      secureTextEntry={type === "visible-password"}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    backgroundColor: "#fff",
    margin: 10,
    justifyContent: "center",
    textAlign: "center",
  },
});
