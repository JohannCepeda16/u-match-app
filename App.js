import React, { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { colors } from "./constants/index";
import Login from "./modules/auth/Login";
import Home from "./modules/home/Home";
import { firebaseConfig } from "./firebase/firebaseConfig";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./modules/auth/Register";
import UserContext from "./persistence/UserContext";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
    const [userId, setUserId] = useState();

    useEffect(() => {
        onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={userId}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen component={Login} name="Login" />
                    <Stack.Screen component={Register} name="Register" />
                    <Stack.Screen component={Home} name="Home" />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
    },
});
