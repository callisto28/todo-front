import axios from "axios";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";

import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomLogo from "../../../components/CustomLogo";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import AuthUsers from "../../../api/services/AuthUser";
import { ILogin } from "../../../types/types";

type FormValues = {
  username: string;
  password: string;
  lastname: string;
  firstname: string;
};

const Register = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignInPress = async () => {
    if (!username.trim() || !password.trim()) {
      alert("Please enter username, password, firstname and lastname");
      return;
    }
    setIsLoading(true);
    const params = { username, password, firstname, lastname };
    try {
      const data = AuthUsers.signup(params);

      // if (response.status === 201) {
      alert("Inscription success");
      // setToken(data.access_token);
      // console.log(data.access_token, "token");

      navigation.navigate("Login");
      // } else {
      //   alert("Invalid username or password");
      // }
    } catch (error) {
      alert("Invalid username or password");
      setIsLoading(false);
    }
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
      <View>
        <CustomLogo />
        <View />

        <CustomInput
          titleText="Pseudonyme :"
          placeholder="username"
          value={username}
          setValue={setUsername}
          secureTextEntry={false}
          onChangeText={(username) => setUsername(username)}
        />

        <CustomInput
          titleText="Mot de passe : "
          placeholder="password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <CustomInput
          titleText="Nom :"
          placeholder="firstname"
          value={firstname}
          setValue={setFirstname}
          secureTextEntry={false}
          onChangeText={(firstname) => setFirstname(firstname)}
        />

        <CustomInput
          titleText="Prénom :"
          placeholder="lastname"
          value={lastname}
          setValue={setLastname}
          secureTextEntry={false}
          onChangeText={(lastname) => setLastname(lastname)}
        />
        <CustomButton text="Register" onPress={onSignInPress} />
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
            onPress={() => navigation.navigate("Login")}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },

  link: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default Register;
