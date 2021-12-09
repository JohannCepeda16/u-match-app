import React from "react";
import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import colors from "../../constants/colors";

export default function UserChat(props) {
    const { user, setCurrentChat } = props;
    return (
        <Pressable onPress={() => setCurrentChat(user)}>
            <View style={styles.row}>
                <Image style={styles.picture} source={{ uri: user.picture }} />
                <Text style={styles.text}>{user.fullName}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: {
        borderWidth: 1,
        borderColor: colors.secondary,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: colors.primary,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    picture: {
        width: 80,
        height: 80,
        borderRadius: 40,
        margin: 10,
    },
    text: {
        color: colors.light,
        fontSize: 20,
    },
});
