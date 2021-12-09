import React from "react";
import { Button, Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants";
import * as ImagePicker from "expo-image-picker";

export default function CustomFilePicker(props) {
    const { handleFile } = props;

    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        handleFile(pickerResult);
    };

    return (
        <View style={styles.card}>
            <Button title="Seleccionar" onPress={openImagePickerAsync}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderColor: colors.light,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
