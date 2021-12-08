import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants";
import CustomTextInput from "../../components/forms/CustomTextInput";
import CustomButton from "../../components/forms/CustomButton";
import UserServices from "../../services/UserServices";

export default function Register(props) {
    const [user, setUser] = useState({
        name: "",
        program: "",
        gender: "",
        college: "",
        semester: 0,
        email: "",
		age: 18,
		instagram: "",
		whatsapp:""
    });
    const [validPsw, setValidPsw] = useState("");
    const [step, setStep] = useState(0);

    function register(e) {
        // e.preventDefault();
        //COMPROBAR LA DIRECCION DE CORREO ELECTRONICO
        if (step == 0) {
            console.log("user", user);
            UserServices.findUserByEmail(user.email)
                .then((res) => {
					console.log("res", res);
                    if (res.status === 200 && res ) res.json();
                })
                .then((data) => {
                    console.log(data);
                    if (data) {
                        alert("El email registrado ya se encuentra en uso");
                    } else {
                        setStep(1);
                    }
                })
                .catch((error) => console.log(error));

            //ENVIAR VERIFICACION DE CORREO ELECTRONICO
        } else if (step == 1) {
            //userRef.sendEmailVerification();
            setStep(2);
            //CREAR USUARIO CON EMAIL && PASSWORD
        } else if (step == 2) {
            if (user.password == validPsw) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(user.email, user.password)
                    .then((userCredential) => {
                        var userRef = userCredential.user;
                        let finalUser = user;
                        finalUser.uid = userRef.uid;
                        UserServices.createUser(finalUser)
                            .then(() => {
                                history.push("/profile");
                            })
                            .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            } else {
                alert("Las contraseñas deben coincidir");
            }
        }
    }

    const handleData = (e) => {
        // e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: "white", fontSize: 50 }}>U-MATCHING</Text>
            <Text style={{ color: "white", fontSize: 18 }}>
                Encuentra tu pareja perfecta
            </Text>
            <View style={styles.base}>
                {step === 0 && (
                    <>
                        <Text style={styles.text}>Nombre y apellido</Text>
                        <CustomTextInput
                            placeholder="Pepito Perez"
                            onChange={(text) =>
                                setUser({ ...user, name: text })
                            }
                        />
                        <Text style={styles.text}>Universidad</Text>
                        <CustomPicker
                            onValueChange={(text) =>
                                setUser({ ...user, college: text })
                            }
                            value={user.college}
                            options={[
                                "Seleccione...",
                                "Escuela Colombiana de Ingeniería Julio Garavito",
                                "Otra",
                            ]}
                        />
                        <Text style={styles.text}>Programa académico</Text>
                        <CustomPicker
                            onValueChange={(text) =>
                                setUser({ ...user, program: text })
                            }
                            value={user.program}
                            options={[
                                "Seleccione...",
                                "Economía",
                                "Administración de empresas",
                                "Ingeniería de sistemas",
                                "Ingeniería mecánica",
                                "Ingeniería industrial",
                                "Ingeniería eléctrica",
                                "Ingeniería electrónica",
                                "Ingeniería biomédica",
                                "Matemáticas",
                            ]}
                        />
                        <Text style={styles.text}>Semestre</Text>
                        <CustomTextInput
                            placeholder="Pepito Perez"
                            type="number-pad"
                            onChange={(text) =>
                                setUser({ ...user, semester: text })
                            }
                        />
                        <Text style={styles.text}>Correo electrónico</Text>
                        <CustomTextInput
                            placeholder="nombre.apellido@mail..."
                            type="email-address"
                            onChange={(text) =>
                                setUser({ ...user, email: text })
                            }
                        />
                    </>
                )}
                {step === 1 && (
                    <>
                        <Text style={styles.text}>Edad</Text>
                        <CustomTextInput placeholder="Pepito Perez" />
                        <Text style={styles.text}>Genero</Text>
                        <CustomTextInput placeholder="Seleccione..." />
                        <Text style={styles.text}>Instagram (opcional)</Text>
                        <CustomTextInput placeholder="@username" />
                        <Text style={styles.text}>Whatsapp (opcional)</Text>
                        <CustomTextInput placeholder="310 555555" />
                    </>
                )}
            </View>
            <CustomButton title="Continuar" onClick={() => register()} />
            <View style={{ marginTop: 20 }}>
                <Text style={styles.text}>¿Ya tienes cuenta?</Text>
                <Text
                    style={[styles.text, { color: colors.secondary }]}
                    onPress={() => props.navigation.navigate("Login")}
                >
                    Iniciar sersión
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
