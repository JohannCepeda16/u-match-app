import React, { useState } from "react";
import { View, Text, StatusBar, StyleSheet, TextInput } from "react-native";
import CustomButton from "../../components/forms/CustomButton";
import CustomTextInput from "../../components/forms/CustomTextInput";
import { colors } from "../../constants";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {initializeApp} from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBm1wyOi7y5GXndue_PbCK54Gwij_ni3U4",
  authDomain: "umatching-d13c4.firebaseapp.com",
  projectId: "umatching-d13c4",
  storageBucket: "umatching-d13c4.appspot.com",
  messagingSenderId: "115293416241",
  appId: "1:115293416241:web:bcaf140aa4fd5c684c1e10",
  measurementId: "G-K6TC866SE5",
};

initializeApp(firebaseConfig);


const auth = getAuth();

export default function Login(props) {
    const [user, setUser] = useState({ email: "", password: "" });
	
    const login = () => {
        console.log(user);
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
				var user = userCredential.user;
				console.log("Is logged", user)
                props.navigation.navigate("Home");
            })
            .catch((error) => {
                if (error.code == "auth/user-not-found") {
                    alert("Datos no encontrados");
                } else if (error.code == "auth/too-many-requests") {
                    alert("Demasiados intentos fallidos, intenta mas tarde");
                } else if (error.code == "auth/wrong-password") {
                    alert("Usuario o contraseña incorrectos");
                }
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Error auth", error);
            });
    };

    const handleData = (fieldName, value) => {
        setUser({ ...user, [fieldName]: value });
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 50 }}>U-MATCHING</Text>
            <Text style={{ color: "white", fontSize: 18 }}>
                Encuentra tu pareja perfecta
            </Text>
            <StatusBar style="auto" />

            <View style={styles.base}>
                <Text style={styles.text}>Correo electrónico</Text>
                <CustomTextInput
                    placeholder="ejemplo@ejemplo.com"
                    type="email-address"
                    onChange={(text) => handleData("email", text)}
                />
                <Text style={styles.text}>Contraseña</Text>
                <CustomTextInput
                    onChange={(text) => handleData("password", text)}
                    placeholder="********"
                    type="visible-password"
                />
            </View>
            <CustomButton title="Ingresar" onClick={() => login()} />
            <View style={{ marginTop: 20 }}>
                <Text style={styles.text}>¿No tienes cuenta?</Text>
                <Text
                    style={[styles.text, { color: colors.secondary }]}
                    onPress={() => props.navigation.navigate("Register")}
                >
                    Registrarse
                </Text>
            </View>
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
    },
    base: {
        backgroundColor: colors.secondary,
        padding: 20,
        borderRadius: 10,
        width: "80%",
        marginTop: 10,
    },
    text: {
        color: "white",
        fontSize: 15,
        textAlign: "center",
    },
});
