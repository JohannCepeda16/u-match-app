import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { colors } from "./constants/index";
import Login from "./modules/auth/Login";
import Home from "./modules/home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./modules/auth/Register";
import UserContext from "./persistence/UserContext";
import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import ProfileView from "./modules/profile/ProfileView";

const Stack = createNativeStackNavigator();

export default function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyBm1wyOi7y5GXndue_PbCK54Gwij_ni3U4",
        authDomain: "umatching-d13c4.firebaseapp.com",
        projectId: "umatching-d13c4",
        storageBucket: "umatching-d13c4.appspot.com",
        messagingSenderId: "115293416241",
        appId: "1:115293416241:web:bcaf140aa4fd5c684c1e10",
        measurementId: "G-K6TC866SE5",
    };

    initializeApp(firebaseConfig);
    const [userId, setUserId] = useState("");

    // useEffect(() => {
    //     onAuthStateChanged((user) => {
    //         if (user) {
    //             setUserId(user.uid);
    //         }
    //     });
    // }, []);

    return (
        <UserContext.Provider value={userId}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen component={Login} name="Login" />
                    <Stack.Screen component={Register} name="Register" />
                    <Stack.Screen component={Home} name="Home" />
                    <Stack.Screen component={ProfileView} name="Profile" />
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
