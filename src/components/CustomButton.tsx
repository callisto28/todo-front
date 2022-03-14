import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text }: any) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text.toUpperCase()}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3B71F3",
    width: "100%",
    padding: 15,
    marginVertical: 5,
    borderRadius: 30,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
