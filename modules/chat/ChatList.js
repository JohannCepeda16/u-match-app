import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { getAuth } from "@firebase/auth";
import MatchServices from "../../services/MatchServices";
import UserChat from "../../components/chat/UserChat";
import colors from "../../constants/colors";

const auth = getAuth();

export default function ChatList(props) {
    const [matches, setMatches] = useState([]);
    const [currentChat, setCurrentChat] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetchMatches();
        }, 1000);
    }, []);

    const fetchMatches = () => {
        auth.currentUser
            .getIdToken()
            .then((token) => {
                MatchServices.fetchMatches(token)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("Matches", data);
                        if (data) {
                            setMatches(data);
                        }
                        setCurrentChat(data[0]);
                        setLoading(false);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    return (
        <ScrollView style={styles.container}>
            {matches.map((match, index) => (
                <View key={index}>
                    <UserChat user={match} />
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        color: "white",
    },
});
