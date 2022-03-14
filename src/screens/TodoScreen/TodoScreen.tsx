import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomLogo from "../../components/CustomLogo";
import axios from "axios";
import userService from "../../api/services/user.service";

const TodoScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignInPress = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description");
      return;
    }
    setIsLoading(true);
    const params = { title, description, completed };

    const userToken = localStorage.getItem("token");
    try {
      // const response = await axios.post(
      //   `http://localhost:3022/todo/create`,
      //   {
      //     title,
      //     description,
      //     completed,
      //   },
      //   { headers: { Authorization: `Bearer ${userToken}` } }
      // );
      // console.log(response.data, "response");

      const data = await userService.postTodo(params);

      // if (response.status === 201) {
      //   alert("Create success");

      navigation.navigate("TodoListScreen");
      // } else {
      //   alert("Invalid title or description1");
      // }
    } catch (error) {
      alert("Invalid title or description2");
      setIsLoading(false);
    }
  };
  const onTodoList = () => {
    navigation.navigate("TodoListScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.logo}>
          <CustomLogo />
        </View>
        <CustomInput
          titleText="title :"
          placeholder="your title"
          value={title}
          setValue={setTitle}
          secureTextEntry={false}
          onChangeText={(title) => setTitle(title)}
        />
        <CustomInput
          titleText="description :"
          placeholder="your description"
          value={description}
          setValue={setDescription}
          secureTextEntry={false}
          onChangeText={(description) => setTitle(description)}
        />
        <CheckBox
          style={styles.checkbox}
          center
          title="Completed"
          checked={completed}
          onPress={() => setCompleted(!completed)}
        />
        <CustomButton text="Valider" onPress={onSignInPress} />
        <CustomButton text="Voir vos Todolists" onPress={onTodoList} />
      </View>
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202125",
  },
  checkbox: {
    alignSelf: "center",
    backgroundColor: "#202125",
  },
  logo: {
    width: "100%",
  },
});
