import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { colors } from "../../constants";

export default function CustomButton(props) {
  const { title, onClick } = props;
  return (
    <View style={styles.base}>
      <Button
        style={styles.button}
        title={title}
        onPress={onClick}
        color={colors.secondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: "80%",
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
  },
});
