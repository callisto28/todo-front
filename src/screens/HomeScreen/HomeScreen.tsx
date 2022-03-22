import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomLogo from "../../components/CustomLogo";
import { RouteParams } from "../../types/types";

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();

  const onSignIn = () => {
    navigation.navigate("Login" as any);
  };
  const onSignUp = () => {
    navigation.navigate("Register" as any);
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
