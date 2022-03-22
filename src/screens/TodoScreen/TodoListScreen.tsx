import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  useDelTodoMutation,
  useGetTodoQuery,
} from "../../api/services/todo.service";
import { CheckBox } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

const TodoListScreen = ({ navigation }: any) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [delTodo, { isLoading: isDeleting }] = useDelTodoMutation();
  const { isLoading, error, data } = useGetTodoQuery("");

  console.log(isDeleting, "isDeleting");

  const dispatch = useDispatch();
  const DelData = (id: number) => {
    console.log(id);
    delTodo(id);
  };
  console.log(data, "data list");
  return (
    <ScrollView style={styles.container}>
      {error ? (
        <Text style={{ color: "red" }}>Aucune tâche</Text>
      ) : isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("TodoScreen")}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Créer une nouvelle tâche
            </Text>
          </TouchableOpacity>
          {data?.map((todo: any, index: any) => (
            <View key={index} style={styles.container}>
              <Text style={styles.text}>{todo.title.toUpperCase()}</Text>
              <Text style={styles.text}>{todo.description}</Text>
              <View style={styles.checkbox}>
                <CheckBox
                  title="Completed"
                  checked={todo.completed}
                  onPress={() => setCompleted(!todo.completed)}
                />

                <AntDesign
                  name="delete"
                  size={24}
                  color="red"
                  onPress={() => DelData(todo.id)}
                />
              </View>
            </View>
          ))}
        </View>
      ) : (
        isDeleting
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  card: {
    margin: 10,
    backgroundColor: "gray",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "space-between",
  },
});

export default TodoListScreen;
