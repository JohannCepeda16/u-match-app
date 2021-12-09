import { StyleSheet, TextInput } from "react-native";
import React, { useEffect } from "react";
import { colors } from "../../constants";

export default function CustomTextInput(props) {
    const { placeholder, onChange, value, type, disabled = false } = props;

    useEffect(() => {
        console.log("type", type);
    }, []);

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
            secureTextEntry={type === "visible-password"}
            keyboardType={type !== "visible-password" ? type : "ascii-capable"}
            editable={!disabled}
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
