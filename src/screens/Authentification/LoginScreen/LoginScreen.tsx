import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomLogo from "../../../components/CustomLogo";
import CustomTextInput from "../../../components/CustomTextInput";
import * as Yup from "yup";
import { usePostLoginMutation } from "../../../api/services/todo.service";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../api/store/reducers/user.reducer";
import TextInputCust from "../../../components/TextInputCust";

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

  const onSubmit = (data: any) => {
    const { username, password } = data;
    postLogin({ username, password });
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
        <TextInputCust
          control={control}
          placeholder="username"
          name="username"
          type="username"
          rules={{
            required: "Champs requis",
          }}
          defaultValue=""
          error={errors.password}
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

        {errors.username && errors.password && (
          <Text style={styles.error}>Veuillez remplir tous les champs</Text>
        )}
        <View>
          <CustomButton text="Login" onPress={handleSubmit(onSubmit)} />
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
