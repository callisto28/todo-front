import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import axios from "axios";

export type Todo = {
  title: string;
  description: string;
  completed: boolean;
};
interface TodoListProps {
  todos: Todo;
  type?: "normal" | "small";
}

const TodoList: React.FunctionComponent<TodoListProps> = ({ todos }) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const userToken = localStorage.getItem("token");
  const [, setTodos] = useState<any>([]);

  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  const deleteTodo = (id: string) => {
    axios.delete(`http://localhost:3022/todo/${id}`, config).then(() => {
      setTodos((todo: { id: string }) => todo.id !== id);
    });
  };
  return (
    <View style={styles.container}>
      <Text
        style={{ fontWeight: "bold", textAlign: "center", color: "white" }}
        numberOfLines={1}
      >
        {todos.title}
      </Text>
      <Text style={{ color: "gray", textAlign: "center" }} numberOfLines={2}>
        {todos.description}
      </Text>

      <CheckBox
        style={{ alignSelf: "center", backgroundColor: "#202125" }}
        center
        title="Completed"
        checked={completed}
        onPress={() => setCompleted(!completed)}
      />
      <AntDesign
        name="delete"
        size={20}
        color="red"
        onPress={() => deleteTodo(todos.id)}
      />
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202125",
  },
});

// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// const Task = (props: { title: string; description: string }) => {
//   return (
//     <View style={styles.item}>
//       <View style={styles.itemLeft}>
//         <View style={styles.square}></View>
//         <Text style={styles.itemText}>{props.title}</Text>
//         <Text style={styles.itemText}>{props.description}</Text>
//       </View>
//       <View style={styles.circular}></View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   item: {
//     backgroundColor: "#FFF",
//     padding: 15,
//     borderRadius: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   itemLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   square: {
//     width: 24,
//     height: 24,
//     backgroundColor: "#55BCF6",
//     opacity: 0.4,
//     borderRadius: 5,
//     marginRight: 15,
//   },
//   itemText: {
//     maxWidth: "80%",
//   },
//   circular: {
//     width: 12,
//     height: 12,
//     borderColor: "#55BCF6",
//     borderWidth: 2,
//     borderRadius: 5,
//   },
// });

// export default Task;
