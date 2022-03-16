import axios from "axios";
import React, { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomLogo from "../../../components/CustomLogo";
import CustomTextInput from "../../../components/CustomTextInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import userService from "../../../api/services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormValues = {
  username: string;
  password: string;
};

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignInPress = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password");
      return;
    }
    setIsLoading(true);
    const params = { username, password };
    try {
      const data: any = await userService.login(params);

      await AsyncStorage.setItem("access_token", data.data.access_token);

      navigation.navigate("TodoScreen");
    } catch (error) {
      alert("Invalid username or password");
      console.log(error);
      setIsLoading(false);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Veuillez saisir au moins 8 caractères")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Password is required"),
  }).required();

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
  });

  return (
    <View style={styles.container}>
      <View>
        <CustomLogo />
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomInput
              titleText="Pseudonym :"
              value={value}
              placeholder="username"
              setValue={setUsername}
              secureTextEntry={false}
              onChangeText={onChange}
              error={error}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomInput
              titleText="Mot de passe : "
              placeholder="password"
              value={value}
              setValue={setPassword}
              secureTextEntry={true}
              onChangeText={onChange}
              error={error}
            />
          )}
        />
        {errors && (
          <Text style={styles.error}>Veuillez remplir tous les champs</Text>
        )}
        <View>
          <CustomButton text="Login" onPress={onSignInPress} />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomTextInput titleText="Créer un compte  " />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register", {});
            }}
          >
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
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

  link: {
    color: "blue",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontWeight: "500",
    marginBottom: 5,
  },
});

export default Login;
