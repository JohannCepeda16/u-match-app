import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { colors } from "../../constants";

export default function CustomTextArea(props) {
    const { placeholder, onChange, value, type, disabled = false } = props;
    return (
        <TextInput
            style={[
                styles.input,
                {
                    backgroundColor: disabled ? colors.dark : colors.light,
                    color: disabled ? colors.light : colors.dark,
                },
            ]}
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            keyboardType={type}
            secureTextEntry={type === "visible-password"}
            editable={!disabled}
            multiline
            numberOfLines={3}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        padding: 10,
        margin: 10,
        justifyContent: "center",
        textAlign: "center",
    },
});
