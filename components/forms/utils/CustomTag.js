import React from "react";
import colors from "../../constants/colors";
import { View, StyleSheet, Text } from "react-native";

export default function CustomTag(props) {
    const { name, key } = props;
    return (
        <View style={styles.base} key={key}>
            <Text style={styles.text}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: 20,
        borderColor: colors.secondary,
        borderWidth: 1,
        padding: 10,
        backgroundColor: colors.secondary,
    },
    text: {
        color: colors.light,
        fontSize: 14
    },
});
