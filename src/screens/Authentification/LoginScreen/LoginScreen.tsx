import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomLogo from "../../../components/CustomLogo";
import CustomTextInput from "../../../components/CustomTextInput";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePostLoginMutation } from "../../../api/services/todo.service";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../api/store/reducers/user.reducer";
import TextInputCust from "../../../components/TextInputCust";
import ControlledInput from "../../../components/TextInputCust";

type FormValues = {
  username: string;
  password: string;
};

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [postLogin, { isLoading, data, isSuccess }] = usePostLoginMutation();

  const dispatch = useDispatch();

  const isToken = useSelector((state) => state.user.access_token);

  useEffect(() => {
    if (isToken) {
      navigation.navigate("TodoListScreen");
    }
  }, [isToken]);

  const onSubmit = (user: {
    username: string;
    password: string;
    access_token?: string;
  }) => {
    postLogin({ username, password });

    // navigation.navigate("TodoListScreen");
    clearErrors();
  };

  useEffect(() => {
    if (data?.access_token) {
      dispatch(
        setUser({
          access_token: data?.access_token,
        })
      );
    }
  }, [data]);

  const validationSchema = Yup.object({
    username: Yup.string().required("Veuillez saisir votre nom d'utilisateur"),
    password: Yup.string()
      // .min(8, "Veuillez saisir au moins 8 caractères")
      // .matches(
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      // )
      .required("Password is required"),
  }).required();

  const {
    control,
    handleSubmit,
    clearErrors,
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
        <Controller
          control={control}
          name="username"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <CustomInput
              label="Username"
              value={username}
              secureTextEntry={false}
              type="text"
              onBlur={onBlur}
              setValue={setUsername}
              onChangeText={onChange}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, value, onBlur },
            fieldState: { error },
          }) => (
            <CustomInput
              value={password}
              label="password"
              type="password"
              onBlur={onBlur}
              secureTextEntry={true}
              setValue={setPassword}
              onChangeText={onChange}
              error={error?.message}
            />
          )}
        />
        {errors && (
          <Text style={styles.error}>Veuillez remplir tous les champs</Text>
        )}
        <View>
          <CustomButton text="Login" onPress={onSubmit} />
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
    alignSelf: "stretch",
    justifyContent: "space-around",
    backgroundColor: "#000",
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

export default Login;
