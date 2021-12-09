import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    Pressable,
	Text
} from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserServices from "../../services/UserServices";
import colors from "../../constants/colors";
import UserCard from "../../components/card/UserCard";
import leftArrow from "../../assets/left-arrow.png";
import rightArrow from "../../assets/right-arrow.png";
import fire from "../../assets/fire.png";
import MatchServices from "../../services/MatchServices";
import Menu from "../../components/menu/Menu";

const auth = getAuth();

export default function Home(props) {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
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
        console.log("updated user", users[index]);
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
        setLoading(true);
        auth.currentUser
            .getIdToken()
            .then((token) => {
                MatchServices.likeUser(token, currentUser.uid)
                    .then((res) => res.text())
                    .then((data) => {
                        if (data == "true") {
                            alert("Has hecho match con " + currentUser.fullName + "!!");
                        } else {
                            console.log(data);
                        }
                        nextUser();
                        setUsers(users.filter((user) => user.uid !== currentUser.uid));
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setLoading(false);
            });
    };
    if (!loading && users.length <= 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    No tenemos usuarios para mostrar
                </Text>
                <Menu navigation={props.navigation}/>
            </View>
        );
    } else if (!loading) {
        return (
            <View style={styles.container}>
                <UserCard user={currentUser} />
                <View style={styles.row}>
                    <Pressable onPress={() => prevUser()}>
                        <Image
                            style={[styles.control, { marginRight: 60 }]}
                            source={leftArrow}
                        />
                    </Pressable>
                    <Pressable onPress={() => likeUser()}>
                        <Image style={[styles.control, {}]} source={fire} />
                    </Pressable>
                    <Pressable onPress={() => nextUser()}>
                        <Image
                            style={[styles.control, { marginLeft: 60 }]}
                            source={rightArrow}
                        />
                    </Pressable>
                </View>
                <Menu navigation={props.navigation}/>
            </View>
        );
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
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    control: {
        width: 50,
        height: 50,
        alignSelf: "center",
    },
    title: {
        fontSize: 25,
        color: colors.secondary,
    },
});
