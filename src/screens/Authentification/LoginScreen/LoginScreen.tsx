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
import { useDispatch } from "react-redux";
import { setUser } from "../../../api/store/reducers/user.reducer";

type FormValues = {
  username: string;
  password: string;
};

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [postLogin, { isLoading, data, isSuccess }] = usePostLoginMutation();
  console.log(isSuccess, "isSuccess");

  const dispatch = useDispatch();

  const onSubmit = (user: {
    username: string;
    password: string;
    access_token: string;
  }) => {
    postLogin({ username, password });

    navigation.navigate("TodoListScreen" as any);
  };

  useEffect(() => {
    if (data?.access_token) {
      dispatch(
        setUser({
          access_token: data.access_token,
        })
      );
    }
  }, [data]);

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
        {/* <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value }, fieldState: { error } }) => ( */}
        <CustomInput
          label="Username"
          value={username}
          secureTextEntry={false}
          type="text"
          onFocus={() => {
            setUsername("");
          }}
          setValue={setUsername}
          onChangeText={(value) => setUsername(value)}
        />
        {/* )}
        /> */}
        {/* <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }, fieldState: { error } }) => ( */}
        <CustomInput
          value={password}
          label="password"
          type="password"
          onFocus={() => {
            setPassword("");
          }}
          secureTextEntry={true}
          setValue={setPassword}
          onChangeText={(value) => setPassword(value)}
        />
        {/* )}
        /> */}
        {errors && (
          <Text style={styles.error}>Veuillez remplir tous les champs</Text>
        )}
        <View>
          <CustomButton text="Login" onPress={onSubmit} />
          {/* navigation.navigate("TodoScreen" as any); */}
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
    color: "red",
    fontWeight: "500",
    marginBottom: 5,
  },
});

export default Login;
