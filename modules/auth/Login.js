import React from "react";
import { View, Text, StatusBar, StyleSheet, TextInput } from "react-native";
import CustomButton from "../../components/forms/CustomButton";
import CustomTextInput from "../../components/forms/CustomTextInput";
import { colors } from "../../constants";

export default function Login() {
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
        />
        <Text style={styles.text}>Contraseña</Text>
        <CustomTextInput placeholder="********" type="visible-password" />
      </View>
      <CustomButton title="Ingresar" />
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>¿No tienes cuenta?</Text>
        <Text
          style={[styles.text, { color: colors.secondary }]}
          onPress={() => alert("Gola")}
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
