import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
} from "react-native";
import CustomButton from "../../components/forms/CustomButton";
import CustomTextInput from "../../components/forms/CustomTextInput";
import { colors } from "../../constants";
import { getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    getMetadata,
} from "firebase/storage";
import UserServices from "../../services/UserServices";
import CustomFilePicker from "../../components/utils/CustomFilePicker";
import CustomTextArea from "../../components/forms/CustomTextArea";
import CustomTag from "../../components/utils/CustomTag";
import Menu from "../../components/menu/Menu";

const auth = getAuth();
const storage = getStorage();

export default function ProfileView(props) {
    const [user, setUser] = useState({});
    const [editable, setEditable] = useState(false);
    const [currentTag, setCurrentTag] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [interests, setInterets] = useState([]);
    const [uploading, setUploading] = useState([false, false, false]);

    /**
     * Traer usuario al cargar el componente
     */
    useEffect(() => {
        setLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                UserServices.findUserByEmail(user.email)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data) {
                            console.log("Found", data);
                            setUser(data);
                            setSelectedFiles(data.pictures || []);
                            setInterets(data.interests || []);
                            setLoading(false);
                        }
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                console.log("no auth");
            }
        });
    }, []);

    const handleEdit = (fieldName, value) => {
        setUser({ ...user, [fieldName]: value });
    };

    const addNewTag = () => {
        let interests = user.interests || [];
        if (currentTag != "") {
            let modifed =
                currentTag[0].toUpperCase() +
                currentTag.toLowerCase().slice(1, currentTag.length);
            interests.push({ name: modifed });
        }

        setCurrentTag("");
        setInterets(interests);
        setUser({ ...user, interests: interests });
    };

    const deleteTag = (i) => {
        let interestsCopy = user.interests;
        if (i > -1) {
            interestsCopy.splice(i, 1);
        }
        setInterets(interestsCopy);
        setUser({ ...user, interests: interestsCopy });
    };

    const updateUser = (newUser) => {
        setLoading(true);
        auth.currentUser
            .getIdToken()
            .then((token) => {
                UserServices.updateUser(newUser, token)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data) {
                            setUser(data);
                        }
                        setEditable(false);
                        setLoading(false);
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    const handleFileInput = async (uri, name) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(storage, `users/pictures/${user.uid}/${name}`);
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        let url = await getDownloadURL(fileRef);
        let data = await getMetadata(fileRef);
        let files = user.pictures || [];
        files.push({ url: url, name: data.name });
        setSelectedFiles(files);
        let updatedUser = user;
        updatedUser.pictures = files;
        updateUser(updatedUser);
    };

    const changuePicture = (e, index) => {
        const file = e.target.files[0];
        const oldFile = selectedFiles[index];
        const files = selectedFiles;
        const status = uploading;
        status[index] = true;
        setUploading(status);
        //Eliminar antigua foto
        firebase
            .storage()
            .ref("users")
            .child("pictures")
            .child(user.uid)
            .child(oldFile.name)
            .delete()
            .then((res) => {
                console.log(res);
                //Agregar nueva foto
                firebase
                    .storage()
                    .ref("users")
                    .child("pictures")
                    .child(user.uid)
                    .child(file.name)
                    .put(file)
                    .then((res) => {
                        res.ref
                            .getDownloadURL()
                            .then((url) => {
                                files[index] = { url: url, name: file.name };
                                setSelectedFiles(files);
                                let updatedUser = user;
                                updatedUser.pictures = files;
                                updateUser(null, updatedUser);
                                status[index] = false;
                                setUploading(status);
                            })
                            .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    };

    if (!loading) {
        return (
            <>
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.title}>Tu información</Text>
                        <View style={styles.column}>
                            <View>
                                <Text style={styles.text}>Nombre</Text>
                                <CustomTextInput
                                    onChange={(text) =>
                                        handleEdit("name", text)
                                    }
                                    value={user.fullName}
                                    disabled={!editable}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>
                                    Correo electrónico
                                </Text>
                                <CustomTextInput value={user.email} disabled />
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View>
                                <Text style={styles.text}>Edad</Text>
                                <CustomTextInput
                                    onChange={(text) => handleEdit("age", text)}
                                    type="number-pad"
                                    value={user.age.toString()}
                                    disabled={!editable}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>Semestre</Text>
                                <CustomTextInput
                                    onChange={(text) =>
                                        handleEdit("semester", text)
                                    }
                                    type="number-pad"
                                    value={user.semester.toString()}
                                    disabled={!editable}
                                />
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View>
                                <Text style={styles.text}>Universidad</Text>
                                <CustomTextInput
                                    onChange={(text) =>
                                        handleEdit("college", text)
                                    }
                                    value={user.college}
                                    disabled={!editable}
                                />
                            </View>
                            <View>
                                <Text style={styles.text}>Programa</Text>
                                <CustomTextInput
                                    onChange={(text) =>
                                        handleEdit("program", text)
                                    }
                                    value={user.program}
                                    disabled={!editable}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Tu estilo</Text>
                        <ScrollView horizontal>
                            <CustomFilePicker
                                value={selectedFiles[0]?.url}
                                handleFile={handleFileInput}
                            />
                            <CustomFilePicker
                                value={selectedFiles[1]?.url}
                                handleFile={handleFileInput}
                            />
                            <CustomFilePicker
                                value={selectedFiles[2]?.url}
                                handleFile={handleFileInput}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>Tus intereses</Text>
                        {editable && (
                            <View style={styles.column}>
                                <Text style={styles.text}>Intereses</Text>
                                <CustomTextInput
                                    onChange={(text) => setCurrentTag(text)}
                                    placeholder="Amor, Amigos, Gatos"
                                    disabled={!editable}
                                />
                            </View>
                        )}
                        {currentTag !== "" && (
                            <CustomButton
                                title="Agregar"
                                onClick={() => addNewTag()}
                            />
                        )}
                        {interests.map((interest, index) => (
                            <View key={index}>
                                <CustomTag name={interest.name} />
                            </View>
                        ))}
                        <View style={[styles.column, { marginTop: 10 }]}>
                            <Text style={styles.text}>Descripción</Text>
                            <CustomTextArea
                                onChange={(text) =>
                                    handleEdit("description", text)
                                }
                                value={user.description}
                                disabled={!editable}
                            />
                        </View>

                        <CustomButton
                            title={
                                editable
                                    ? "Guardar información"
                                    : "Editar información"
                            }
                            onClick={() =>
                                editable ? updateUser(user) : setEditable(true)
                            }
                        />
                    </View>
                </ScrollView>
                <Menu navigation={props.navigation} />
            </>
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
    },
    title: {
        color: colors.secondary,
        fontSize: 50,
    },
    column: {
        flexDirection: "column",
    },
    row: {
        flexDirection: "row",
    },
    text: {
        color: colors.secondary,
        fontSize: 15,
        textAlign: "center",
    },
});
