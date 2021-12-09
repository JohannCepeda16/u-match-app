import React, { useState } from "react";
import { Button, View, StyleSheet, Image } from "react-native";
import { colors } from "../../constants";
import * as ImagePicker from "expo-image-picker";

export default function CustomFilePicker(props) {
    const { handleFile } = props;

    const [file, setFile] = useState();

    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        setFile(pickerResult);
        handleFile(pickerResult);
    };

    return (
        <View style={styles.card}>
            {file ? (
                <Image style={styles.picture} source={file} />
            ) : (
                <Button
                    style={styles.button}
                    title="Seleccionar"
                    onPress={openImagePickerAsync}
                ></Button>
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
        width:200,
        margin: 5,
    },
    picture:{
        width:200,
        height:200
    },
    button: {
        marginTop: "auto",
        color: colors.secondary,
        alignSelf:"center"
    },
});
