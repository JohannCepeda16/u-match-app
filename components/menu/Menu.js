import React, { useState } from "react";
import { Button, View, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../constants";

export default function Menu(props) {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState([
        { label: "Inicio", path: "Home" },
        { label: "Mi Perfil", path: "Profile" },
        { label: "Chat", path: "Chat" },
    ]);
    return (
        <>
            {visible && (
                <View style={styles.panel}>
                    {options.map((option, i) => (
                        <Pressable
                            key={i}
                            onPress={() =>
                                props.navigation.navigate(option.path)
                            }
                        >
                            <Text style={styles.item}>{option.label}</Text>
                        </Pressable>
                    ))}
                </View>
            )}
            <Pressable style={styles.fab} onPress={() => setVisible(!visible)}>
                <Text style={styles.text}>{visible ? "X" : "+"}</Text>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        borderRadius: 30,
        width: 60,
        height: 60,
        backgroundColor: colors.light,
        bottom: 10,
        right: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    panel: {
        position: "absolute",
        width: 150,
        bottom: 90,
        right: 10,
        backgroundColor: colors.primary,
    },
    text: {
        color: colors.dark,
    },
    item: {
        fontSize: 18,
        backgroundColor: colors.third,
        color: colors.light,
        borderColor: colors.secondary,
        borderWidth: 1,
        margin: 1,
        padding:10,
    },
});
