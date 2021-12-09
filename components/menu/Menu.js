import React, { useState } from "react";
import { Button, View, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../constants";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth();

export default function Menu(props) {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState([
        { label: "Inicio", path: "Home" },
        { label: "Mi Perfil", path: "Profile" },
        { label: "Chat", path: "Chat" },
        { label: "Cerrar sesión", path: "logout" },
    ]);
    return (
        <>
            {visible && (
                <View style={styles.panel}>
                    {options.map((option, i) => (
                        <Pressable
                            key={i}
                            onPress={() => {
                                if (option.path !== "logout")
                                    props.navigation.navigate(option.path);
                                else {
                                    signOut(auth);
                                    props.navigation.navigate("Home");
                                }
                            }}
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
        padding: 10,
    },
});
