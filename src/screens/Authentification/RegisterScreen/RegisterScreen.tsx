import axios from "axios";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomLogo from "../../../components/CustomLogo";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

// import userService from "../../../api/services/user.service";
import { RouteParams } from "../../../types/types";
import { todoService } from "../../../api/services/todo.service";

type FormValues = {
  username: string;
  password: string;
  lastname: string;
  firstname: string;
};

const Register = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RouteParams>>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [postSignup, {}] = todoService.usePostSignupMutation();

  const handleCreateAccount = async () => {
    setIsLoading(true);

    await postSignup({
      body: {
        username,
        password,
        firstname,
        lastname,
      },
    });

    navigation.navigate("Login" as any);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Veuillez saisir au moins 8 caractères")
      .required("Password is required"),
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
  }).required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <CustomLogo />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          width: "70%",
          alignSelf: "center",
        }}
      >
        <View>
          <CustomInput
            label="Username"
            value={username}
            secureTextEntry={false}
            type="text"
            setValue={setUsername}
            onChangeText={(value) => setUsername(value)}
          />

          <CustomInput
            value={password}
            label="password"
            type="password"
            secureTextEntry={true}
            setValue={setPassword}
            onChangeText={(value) => setPassword(value)}
          />

          <CustomInput
            value={firstname}
            label="firstname"
            secureTextEntry={false}
            setValue={setFirstname}
            onChangeText={(value) => setFirstname(value)}
          />

          <CustomInput
            value={lastname}
            label="lastname"
            secureTextEntry={false}
            setValue={setLastname}
            onChangeText={(value) => setLastname(value)}
          />
        </View>
        <View>
          <CustomButton text="Register" onPress={handleCreateAccount} />
        </View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontStyle: "italic", color: "#fff" }}>
            Vous avez déjà un compte ?
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login" as any)}
          >
            <Text style={styles.link}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
    backgroundColor: "black",
  },
  logo: {
    maxWidth: 250,
    maxHeight: 150,
    marginHorizontal: "25%",
    borderRadius: 50,
    marginBottom: 40,
  },

  link: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default Register;
