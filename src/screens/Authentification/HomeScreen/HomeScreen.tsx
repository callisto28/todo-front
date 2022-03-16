import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomLogo from "../../../components/CustomLogo";

export const Home = ({ navigation }: any) => {
  const onSignIn = () => {
    navigation.navigate("Login");
  };
  const onSignUp = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <CustomLogo />
      </View>
      <View style={styles.button}>
        <CustomButton text="Se connecter" onPress={onSignIn} />
      </View>
      <View style={styles.button}>
        <CustomButton text="Créer un compte" onPress={onSignUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  logo: {
    width: "50%",
    maxWidth: 300,
    maxHeight: 200,
    borderRadius: 70,
    marginBottom: 40,
  },
  button: {
    width: "55%",
    borderRadius: 70,
  },
});
