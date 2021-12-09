import React from "react";
import colors from "../../constants/colors";
import { View, StyleSheet, Text } from "react-native";

export default function CustomTag(props) {
    const { name, color = colors.secondary } = props;
    return (
        <View style={[styles.base, { backgroundColor: color }]}>
            <Text
                style={[
                    styles.text,
                    {
                        color:
                            color === colors.light ? colors.dark : colors.light,
                    },
                ]}
            >
                {name}
            </Text>
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
        flexDirection: "row",
    },
    text: {
        color: colors.light,
        fontSize: 14,
    },
});
