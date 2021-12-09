import { getAuth } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "../../constants";
import ChatServices from "../../services/ChatServices";

const auth = getAuth();

export default function ChatView(props) {
    const { user, matches } = props;
    const [chatMessages, setChatMessages] = useState([]);
    const [limit, setLimit] = useState(20);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        retrieveAllMessages();
    }, []);

    const retrieveAllMessages = () => {
        auth.currentUser
            .getIdToken()
            .then((token) => {
                ChatServices.retrieveAllMessages(token, matches)
                    .then((res) => res.json())
                    .then((data) => {
                        setChatMessages(data[user.userId]);
                        setLoading(false);
                        // autoScroll();
                        setLimit(20);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{user.fullName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        paddingBottom: 10,
    },
    text: {
        color: colors.light,
        fontWeight: "bold",
        textAlign: "center",
    },
});
