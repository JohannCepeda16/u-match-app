import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { colors } from "../../constants";
import CustomButton from "../forms/CustomButton";
import CustomTag from "../utils/CustomTag";

export default function UserCard(props) {
    const { user } = props;
    const [currentPicture, setCurrentPicture] = useState(user.pictures[0] || null);

    useEffect(() => {
        setCurrentPicture(user.pictures[0]);
    }, [user]);

    return (
        <View style={styles.baseCard}>
            <View
                style={[
                    styles.row,
                    { justifyContent: "space-between", display: "flex" },
                ]}
            >
                <View style={{ alignSelf: "flex-start", marginRight: 60 }}>
                    <Text style={styles.text}>{user.fullName}</Text>
                </View>
                <View style={{ alignSelf: "flex-end", marginLeft: 60 }}>
                    <Text style={styles.text}>{user.age}</Text>
                </View>
            </View>
            <View>
                <Image
                    style={styles.picture}
                    source={{ uri: currentPicture.url }}
                />
            </View>
            <View style={styles.row}>
                {user.pictures && user.pictures.map((picture, index) => (
                    <Pressable
                        style={[
                            styles.point,
                            {
                                backgroundColor:
                                    picture === currentPicture
                                        ? colors.light
                                        : colors.primary,
                            },
                        ]}
                        key={index}
                        onPress={() => setCurrentPicture(user.pictures[index])}
                    ></Pressable>
                ))}
            </View>
            <View>
                <Text style={styles.text}>{user.description}</Text>
            </View>
            <View style={styles.row}>
                {user.interests && user.interests.map((interest, index) => (
                    <View key={index}>
                        <CustomTag name={interest.name} color={colors.light} />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    baseCard: {
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        width: "90%",
        padding: 20,
    },
    row: {
        margin: 15,
        flexDirection: "row",
    },
    column: {
        flexDirection: "column",
    },
    text: {
        color: colors.light,
        fontSize: 20,
    },
    picture: {
        width: 300,
        height: 300,
    },
    point: {
        width: 20,
        height: 20,
        borderRadius: 10,
        margin: 5,
    },
});
