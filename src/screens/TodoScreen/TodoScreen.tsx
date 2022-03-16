import { View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomLogo from "../../components/CustomLogo";
import userService from "../../api/services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TodoScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [token, setToken] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getToken = async () => {
    const token = await AsyncStorage.getItem("access_token");
    setToken(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  const onSignInPress = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description");
      return;
    }
    setIsLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const params = { title, description, completed, config };
    try {
      await userService.postTodo(params);
      navigation.navigate("TodoListScreen");
    } catch (error) {
      alert("Invalid title or description");
      setIsLoading(false);
    }
  };
  const onTodoList = () => {
    navigation.navigate("TodoListScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <CustomLogo />

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
        <View>
          <CustomButton text="Valider votre tâche" onPress={onSignInPress} />
          <CustomButton text="Voir vos Tâches" onPress={onTodoList} />
        </View>
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
