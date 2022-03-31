import axios from "axios";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomLogo from "../../../components/CustomLogo";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { RouteParams } from "../../../types/types";

import { useDispatch } from "react-redux";
import { setUser } from "../../../api/store/reducers/user.reducer";
import { usePostSignupMutation } from "../../../api/services/todo.service";
import TextInputCust from "../../../components/TextInputCust";

export type SignupProps = NativeStackScreenProps<RouteParams, "Register">;

type FormValues = {
  username: string;
  password: string;
  lastname: string;
  firstname: string;
};

const Register = (props: SignupProps) => {
  const navigation = useNavigation();
  const [postSignup, { isLoading, data }] = usePostSignupMutation();
  const dispatch = useDispatch();

  const onSubmit = async (todoService: {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
  }) => {
    dispatch(
      setUser({
        username: todoService.username,
        firstname: todoService.firstname,
        lastname: todoService.lastname,
      })
    );
    await postSignup({ username, password, firstname, lastname });
    clearErrors();
    navigation.navigate("Login" as any);
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

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
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

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
          <TextInputCust
            control={control}
            placeholder="username"
            name="username"
            type="username"
            rules={{
              required: "Champs requis",
            }}
            defaultValue=""
            error={errors.username}
          />

          <TextInputCust
            control={control}
            placeholder="Mot De Passe"
            name="password"
            type="password"
            //  rules={{
            //    required: 'Champs requis',
            //    pattern: {
            //      value: pass,
            //      message: 'Doit avoir 8 caractères, une majuscule, une minuscule et un chiffre',
            //    },
            //  }}
            defaultValue=""
            error={errors.password}
          />

          <TextInputCust
            control={control}
            placeholder="prénom"
            name="prénom"
            type="prénom"
            rules={{
              required: "Champs requis",
            }}
            defaultValue=""
            error={errors.firstname}
          />

          <TextInputCust
            control={control}
            placeholder="nom"
            name="nom"
            type="nom"
            rules={{
              required: "Champs requis",
            }}
            defaultValue=""
            error={errors.lastname}
          />
          {errors.username &&
            errors.password &&
            errors.lastname &&
            errors.firstname && (
              <Text style={styles.error}>Veuillez remplir tous les champs</Text>
            )}
        </View>
        <View>
          <CustomButton
            text="S'inscrire"
            onPress={() =>
              onSubmit({ username, password, firstname, lastname })
            }
          />
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
  error: {
    color: "#f00",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 5,
  },
});

export default Register;
