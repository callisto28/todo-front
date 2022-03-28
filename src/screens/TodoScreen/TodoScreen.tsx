import { View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import CustomLogo from "../../components/CustomLogo";
import { usePostTodoMutation } from "../../api/services/todo.service";
import { useDispatch } from "react-redux";
import store from "../../api/store/Store";
import { addTodo } from "../../api/store/reducers/todo.reducer";
import { logout } from "../../api/store/reducers/user.reducer";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const TodoScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const [postTodo, { isLoading, data, isSuccess }] = usePostTodoMutation();

  const dispatch = useDispatch();

  const onLogout = () => {
    store.dispatch(logout(null));
    navigation.navigate("Accueil Todo");
  };

  const onSignInPress = (todoService: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }) => {
    dispatch(
      addTodo({
        id: todoService.id,
        title: todoService.title,
        description: todoService.description,
        completed: todoService.completed,
      })
    );
    postTodo({ title, description, completed });
    navigation.navigate("TodoListScreen");
  };

  const onTodoList = () => {
    navigation.navigate("TodoListScreen");
  };

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
        <CustomInput
          label="Title"
          value={title}
          secureTextEntry={false}
          type="text"
          onFocus={() => {
            setTitle("");
          }}
          setValue={setTitle}
          onChangeText={(value) => setTitle(value)}
        />

        <CustomInput
          label="Description"
          value={description}
          secureTextEntry={false}
          type="text"
          onFocus={() => {
            setDescription("");
          }}
          setValue={setDescription}
          onChangeText={(value) => setDescription(value)}
        />
      </View>
      <View style={styles.button}>
        <AntDesign name="home" size={30} color="green" onPress={onLogout} />

        <Ionicons
          name="create"
          size={30}
          color="blue"
          onPress={onSignInPress}
        />
        <Entypo name="list" size={30} color="red" onPress={onTodoList} />
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
    backgroundColor: "black",
  },
  checkbox: {
    alignSelf: "center",
    backgroundColor: "#202125",
  },
  logo: {
    width: "50%",
    maxWidth: 300,
    maxHeight: 200,
    borderRadius: 70,
    marginBottom: 40,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
});
