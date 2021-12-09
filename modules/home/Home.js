import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserServices from "../../services/UserServices";
import colors from "../../constants/colors"

const auth = getAuth();

export default function Home(props) {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState({
        age: 25,
        gender: "Todos",
        interests: false,
        college: "",
        program: "",
        rating: 5,
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                props.navigation.navigate("Login");
            } else {
                fetchUsers(limit);
            }
        });
    }, []);

    useEffect(() => {
        setCurrentUser(users[index]);
    }, [index]);

    const fetchUsers = (limit) => {
        setLoading(true);
        auth.currentUser
            .getIdToken()
            .then((token) => {
                UserServices.fetchCustom(limit, filters, token)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data) {
                            data = data.filter((user) => user.pictures);
                            setUsers(data);
                            setCurrentUser(data[index]);
                            setLoading(false);
                        }
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    const prevUser = () => {
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(users.length - 1);
        }
    };

    const nextUser = () => {
        if (index < users.length - 1) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    };

    const likeUser = () => {
        auth.currentUser
            .getIdToken()
            .then((token) => {
                MatchServices.likeUser(token, currentUser.uid)
                    .then((res) => res.text())
                    .then((data) => {
                        if (data == "true") {
                            document.getElementById("modalButton").click();
                        } else {
                            console.log(data);
                        }
                        nextUser();
                        setUsers(users.splice(index, index));
                        console.log(data);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };
    if (!loading) {
        return <View style={styles.container}></View>;
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={colors.secondary} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        paddingBottom: 10,
        height: "100%",
    },
});
