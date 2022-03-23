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

const TodoScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);

  const [postTodo, { isLoading, data, isSuccess }] = usePostTodoMutation();
  console.log(isSuccess, "isSuccess addtodo");

  const dispatch = useDispatch();

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
        <CustomButton text="Valider votre tâche" onPress={onSignInPress} />
        <CustomButton text="Voir vos Tâches" onPress={onTodoList} />
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
    width: "55%",
    borderRadius: 70,
  },
});
