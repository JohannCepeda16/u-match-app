import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { getAuth } from "@firebase/auth";
import MatchServices from "../../services/MatchServices";
import UserChat from "../../components/chat/UserChat";
import colors from "../../constants/colors";
import ChatView from "./ChatView";

const auth = getAuth();

export default function ChatList(props) {
    const [matches, setMatches] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isChating, setIsChating] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetchMatches();
        }, 1000);
    }, []);

    useEffect(() => {
        if (currentChat) setIsChating(true);
    }, [currentChat]);

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
                        setLoading(false);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    if (!isChating && !loading) {
        return (
            <ScrollView style={styles.container}>
                {matches.map((match, index) => (
                    <View key={index}>
                        <UserChat
                            user={match}
                            setCurrentChat={setCurrentChat}
                        />
                    </View>
                ))}
            </ScrollView>
        );
    } else if (isChating && !loading) {
        return <ChatView user={currentChat} matches={matches} />;
    } else {
        return (
            <View
                style={[
                    styles.container,
                    { justifyContent: "center", alignItems: "center" },
                ]}
            >
                <ActivityIndicator color={colors.secondary} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        color: "white",
    },
});
