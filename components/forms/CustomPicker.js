import React from "react";
import { View, StyleSheet, Picker } from "react-native";
import { colors } from "../../constants";

export default function CustomPicker(props) {
    const { options, value, onValueChange } = props;
    return (
        <View style={styles.base}>
            <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={onValueChange}
            >
                {options.map((option, i) => (
                    <Picker.Item key={i} label={option} value={option} />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: "#fff",
        padding: 0,
        margin: 0,
        width: "95%",
        alignSelf:"center",
        justifyContent:"center"
    },
    picker: {
        backgroundColor: "#fff",
        width: "80%",
    },
});
