import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomLogo from "../../../components/CustomLogo";
import { authService } from "../../../api/services/auth";
import { StatusBar } from "expo-status-bar";

const Login = ({ navigation }: any) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const onSignInPress = async () => {
    fetch("http://localhost:3022/auth/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.access_token) {
          setToken(data.access_token);

          navigation.navigate("Home");
        }
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomLogo />
        <CustomInput
          placeholder="your username"
          value={username}
          setValue={setUsername}
          secureTextEntry={false}
          onChangeText={(username) => setUsername(username)}
        />
        <CustomInput
          placeholder="your password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <CustomButton text="Login" onPress={onSignInPress} />

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text>Vous n'avez pas encore de compte </Text>
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
    backgroundColor: "#fff",
    // padding: 20,
    // top: "25%",
  },

  link: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default Login;

// import axios from "axios";
// import React, { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import CustomButton from "../../../components/CustomButton";
// import CustomInput from "../../../components/CustomInput";
// import CustomLogo from "../../../components/CustomLogo";
// import CustomTextInput from "../../../components/CustomTextInput";
// import * as Yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// type FormValues = {
//   username: string;
//   password: string;
// };

// const Login = ({ navigation }: any) => {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [token, setToken] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const onSignInPress = async () => {
//     if (!username.trim() || !password.trim()) {
//       alert("Please enter username and password");
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await axios.post(`http://localhost:3022/auth/login`, username,
//         password, {
//         headers: {
//           "Content-Type": "application/json", "Authorization": "Bearer " + token

//       });
//       if (response.status === 201) {
//         alert("Login success");
//         setToken(response.data.access_token);
//         console.log(response.data.access_token, "token");

//         navigation.navigate("Home");
//       } else {
//         alert("Invalid username or password");
//       }
//     } catch (error) {
//       alert("Invalid username or password");
//       setIsLoading(false);
//     }
//   };

//   const validationSchema = Yup.object({
//     username: Yup.string().required("Username is required"),
//     password: Yup.string()
//       .min(8, "Veuillez saisir au moins 8 caractères")
//       .required("Password is required"),
//   }).required();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormValues>({
//     resolver: yupResolver(validationSchema),
//   });

//   return (
//     <View style={styles.container}>
//       <View>
//         <CustomLogo />
//         <Controller
//           control={control}
//           name="username"
//           render={({ field: { onChange, value } }) => (
//             <CustomInput
//               titleText="Pseudonyme :"
//               placeholder="username"
//               value={value}
//               setValue={setUsername}
//               secureTextEntry={false}
//               onChangeText={onChange}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name="password"
//           render={({ field: { onChange, value } }) => (
//             <CustomInput
//               titleText="Mot de passe : "
//               placeholder="password"
//               value={value}
//               setValue={setPassword}
//               secureTextEntry={true}
//               onChangeText={onChange}
//             />
//           )}
//         />
//         {errors && (
//           <Text style={styles.error}>Veuillez remplir tous les champs</Text>
//         )}
//         <CustomButton text="Login" onPress={onSignInPress} />

//         <View
//           style={{
//             flexDirection: "row",
//             marginTop: 20,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <CustomTextInput titleText="Créer un compte  " />
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate("Register", {});
//             }}
//           >
//             <Text style={styles.link}>Register</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#202125",
//     // padding: 20,
//     // top: "25%",
//   },

//   link: {
//     color: "blue",
//     fontWeight: "bold",
//   },
//   error: {
//     color: "red",
//     fontWeight: "500",
//     marginBottom: 5,
//   },
// });

// export default Login;
