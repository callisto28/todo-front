import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useDelTodoMutation,
  useGetTodoQuery,
  usePatchTodoMutation,
} from "../../api/services/todo.service";
import { Checkbox } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const TodoListScreen = ({ navigation }: any) => {
  const { isLoading, error, data } = useGetTodoQuery("");
  const [delTodo, { isLoading: isDeleting }] = useDelTodoMutation();
  const [patchTodo] = usePatchTodoMutation();

  const DelData = (id: string) => {
    delTodo(id);
  };
  const [completed, setCompleted] = useState({});
  console.log(completed, "completed");

  const onSubmit = (id: string, userId: string, completed: boolean) => {
    console.log(id, userId, completed, "data");
    patchTodo({ id, completed, userId });
  };

  useEffect(() => {
    let init = {};
    data &&
      data.map((item: { id: string; userId: string; completed: boolean }) => {
        (init = item.id),
          {
            [item.id]: item.completed,
          };
        console.log(init, "init");
      });
    setCompleted(init);
  }, []);

  return (
    <ScrollView style={styles.container}>
      {error ? (
        <Text style={{ color: "red" }}>Aucune tâche</Text>
      ) : isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.navigate("TodoScreen")}>
            <Text
              style={{
                color: "#000",
                alignSelf: "center",
                textAlign: "center",
                paddingHorizontal: 5,
                borderColor: "#000",
                backgroundColor: "#3ADCFE",
                borderWidth: 1,
                borderRadius: 5,
                width: "50%",
              }}
            >
              Créer une nouvelle tâche
            </Text>
          </TouchableOpacity>
          {data?.map((todo: any | boolean, index: any) => (
            <View key={index} style={styles.content}>
              <Text style={styles.textTitre}>{todo.title.toUpperCase()}</Text>
              <Text style={styles.textContent}>{todo.description}</Text>

              <View style={styles.checkbox}>
                <Checkbox
                  color="#6BF10E"
                  uncheckedColor="#3ADCFE"
                  status={todo.completed ? "checked" : "unchecked"}
                  onPress={() => {
                    onSubmit(todo.id, todo.userId, !todo.completed);
                  }}
                />

                <AntDesign
                  name="delete"
                  size={24}
                  color="#DF1F0C"
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
  textTitre: {
    paddingVertical: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  textContent: {
    paddingVertical: 5,
    color: "#F1830E",
    fontSize: 15,
    textAlign: "center",
  },
  card: {
    margin: 10,
    backgroundColor: "gray",
  },
  content: {
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    borderColor: "#3ADCFE",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#000",
    width: "70%",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    alignContent: "space-around",
    justifyContent: "space-around",
  },
});

export default TodoListScreen;
