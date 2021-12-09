import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../../constants";
import CustomTextInput from "../../components/forms/CustomTextInput";
import CustomButton from "../../components/forms/CustomButton";
import CustomPicker from "../../components/forms/CustomPicker";
import UserServices from "../../services/UserServices";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth();

export default function Register(props) {
    const [user, setUser] = useState({
        fullName: "",
        program: "",
        gender: "",
        college: "",
        semester: 0,
        email: "",
        age: 18,
        description:"",
        instagram: "",
        whatsapp: "",
        password: "",
    });
    const [validPsw, setValidPsw] = useState("");
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);

    async function register(e) {
        setLoading(true);
        //COMPROBAR LA DIRECCION DE CORREO ELECTRONICO
        if (step == 0) {
            console.log("user", user);
            await UserServices.findUserByEmail(user.email).then((res) => {
                if (res.status === 200 && res)
                    res.json()
                        .then((data) => {
                            if (data) {
                                alert(
                                    "El email registrado ya se encuentra en uso"
                                );
                            } else {
                                setStep(1);
                            }
                        })
                        .catch((error) => console.log(error));
                else {
                    setStep(1);
                }
            });

            //ENVIAR VERIFICACION DE CORREO ELECTRONICO
        } else if (step == 1) {
            //userRef.sendEmailVerification();
            setStep(2);
            //CREAR USUARIO CON EMAIL && PASSWORD
        } else if (step == 2) {
            if (user.password == validPsw) {
                await createUserWithEmailAndPassword(auth, user.email, user.password)
                    .then((userCredential) => {
                        var userRef = userCredential.user;
                        let finalUser = user;
                        finalUser.uid = userRef.uid;
                        UserServices.createUser(finalUser)
                            .then(() => {
                                props.navigation.navigate("Profile");
                            })
                            .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            } else {
                alert("Las contraseñas deben coincidir");
            }
        }
        setLoading(false);
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
                                setUser({ ...user, fullName: text })
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
                            placeholder="1-10"
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
                        <CustomTextInput
                            placeholder="18"
                            type="number-pad"
                            onChange={(text) => setUser({ ...user, age: text })}
                        />
                        <Text style={styles.text}>Género</Text>
                        <CustomPicker
                            onValueChange={(text) =>
                                setUser({ ...user, gender: text })
                            }
                            value={user.gender}
                            options={[
                                "Seleccione...",
                                "Masculino",
                                "Femenino",
                                "Otro",
                            ]}
                        />
                        <Text style={styles.text}>Instagram (opcional)</Text>
                        <CustomTextInput
                            placeholder="@username"
                            onChange={(text) =>
                                setUser({ ...user, instagram: text })
                            }
                        />
                        <Text style={styles.text}>Whatsapp (opcional)</Text>
                        <CustomTextInput
                            placeholder="+573106565234"
                            onChange={(text) =>
                                setUser({ ...user, whatsapp: text })
                            }
                        />
                    </>
                )}
                {step === 2 && (
                    <View>
                        <Text style={styles.text}>Nueva contraseña</Text>
                        <CustomTextInput
                            placeholder="********"
                            onChange={(text) =>
                                setUser({ ...user, password: text })
                            }
                            type="visible-password"
                        />
                        <Text style={styles.text}>Confirmar contraseña</Text>
                        <CustomTextInput
                            placeholder="********"
                            onChange={(text) => setValidPsw(text)}
                            type="visible-password"
                        />
                    </View>
                )}
            </View>
            {loading ? (
                <ActivityIndicator animating={true} color={colors.secondary} />
            ) : (
                <CustomButton title="Continuar" onClick={() => register()} />
            )}
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
