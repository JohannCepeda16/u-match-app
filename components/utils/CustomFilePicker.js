import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, Image } from "react-native";
import { colors } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../forms/CustomButton";

export default function CustomFilePicker(props) {
    const { handleFile, value } = props;

    const [file, setFile] = useState();

    useEffect(() => {
        console.log("File received", value);
    }, [value]);

    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("El acesso a la camara es requerido");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log("Image", pickerResult);
        setFile(pickerResult);
        handleFile(pickerResult.uri, new Date().toISOString());
    };

    return (
        <View style={styles.card}>
            {value || file ? (
                <Image
                    style={styles.picture}
                    source={value ? { uri: value } : file}
                />
            ) : (
                <CustomButton
                    title="Seleccionar"
                    onClick={openImagePickerAsync}
                ></CustomButton>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderColor: colors.light,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        width: 200,
        margin: 5,
    },
    picture: {
        width: 200,
        height: 200,
    },
    button: {
        marginTop: "auto",
        color: colors.secondary,
        alignSelf: "center",
    },
});
