import { Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import React from "react";

const CustomButton = ({ onPress, text }: any) => {
  return (
    <Button mode="contained" onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text.toUpperCase()}</Text>
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3B71F3",
    width: "100%",
    padding: 2,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
