import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

import TodoList from "../../components/TodoList";

const TodoListScreen = ({ navigation }: any) => {
  const [token, setToken] = useState<string>("");
  const userToken = localStorage.getItem("token");
  const [todos, setTodos] = useState<any>([]);

  const config = {
    headers: {
      Authorization: "Bearer " + userToken,
    },
  };

  useEffect(() => {
    axios.get(`http://localhost:3022/todo`, config).then((res) => {
      console.log(res.data, "res");
      setTodos(res.data);
    });
  }, []);

  const renderItem: ListRenderItem<any> = ({ item }) => {
    return <TodoList todos={item} />;
  };
  const onTodoList = () => {
    navigation.navigate("TodoScreen");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity onPress={onTodoList} style={{ alignItems: "center" }}>
        <Text>Créer une nouvelle tâche</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202125",
  },
});

// return (
//   <View>
//     <Text
//       style={{ fontWeight: "bold", justifyContent: "center", fontSize: 22 }}
//     >
//       Tâches à effectuer
//     </Text>

//     <View style={{ flexGrow: 2, padding: 1 }}>
//       <View style={styles.container}>
//         {todos.length > 0 ? (
//           <FlatList
//             data={todos}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id.toString()}
//           />
//         ) : (
//           <ActivityIndicator size="large" />
//         )}
//       </View>
//     </View>
//     <CustomButton text="Créer une nouvelle" onPress={onTodoList} />
//   </View>
// );
