import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useGetTodoQuery } from "../../api/services/todo.service";
import { Card, Paragraph } from "react-native-paper";

const TodoListScreen = () => {
  const { isLoading, error, data = { todos: [] } } = useGetTodoQuery("");
  console.log(data.todos, "data GetTodo");

  if (error) {
    return (
      <View style={styles.container}>
        <Paragraph>Aucune Tâche trouvée</Paragraph>
      </View>
    );
  }
  const renderTodo = ({ title = "", description = "" }) => (
    <Card style={styles.card} mode="elevated">
      <Card.Title title={title} />
      <Card.Content>
        <View style={styles.content}>
          <Paragraph>{description}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
  return <View style={styles.container}>{data.todos.map(renderTodo)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "space-around",
    backgroundColor: "black",
  },
  card: {
    margin: 4,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TodoListScreen;

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import userService from "../../api/services/user.service";
// import { Card, CheckBox } from "react-native-elements";
// import { AntDesign } from "@expo/vector-icons";
// import CustomLogo from "../../components/CustomLogo";

// const TodoListScreen = ({ navigation }: any) => {
//   const [completed, setCompleted] = useState<boolean>(false);
//   const [token, setToken] = useState<string | any>("");
//   const [todos, setTodos] = useState<any>([]);

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const getToken = async () => {
//     const tokens = await AsyncStorage.getItem("access_token");
//     setToken(tokens);
//   };
//   useEffect(() => {
//     getToken();
//   }, []);

//   const getData = async () => {
//     const data = await userService.getTodo(config);

//     setTodos(data.data);
//   };

//   useEffect(() => {
//     if (token) {
//       getData();
//     }
//   }, [token]);

//   const delData = async (id: any) => {
//     await userService.delTodo(id, config);
//   };

//   const onTodoList = () => {
//     navigation.navigate("TodoScreen");
//   };

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <View style={styles.logo}>
//           <CustomLogo />
//         </View>
//         <TouchableOpacity onPress={onTodoList} style={{ alignItems: "center" }}>
//           <Text style={{ color: "red" }}>Créer une nouvelle tâche</Text>
//         </TouchableOpacity>
//         {todos.map((item: any, key: any) => (
//           <Card key={key}>
//             <Text
//               style={{
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 color: "black",
//               }}
//             >
//               Titre :{item.title}
//             </Text>
//             <Text style={{ color: "gray", textAlign: "center" }}>
//               Description :{item.description}
//             </Text>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <View>
//                 <CheckBox
//                   style={{ alignSelf: "center", backgroundColor: "#202125" }}
//                   center
//                   checked={completed}
//                   title="Completed"
//                   onPress={() => setCompleted(!completed)}
//                 />
//               </View>
//               <AntDesign
//                 name="delete"
//                 size={20}
//                 color="red"
//                 onPress={() => delData(item.id)}
//               />
//             </View>
//           </Card>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default TodoListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "black",
//   },
//   logo: {
//     top: "3%",
//     width: "50%",
//     maxWidth: 300,
//     maxHeight: 200,
//     borderRadius: 70,
//     marginBottom: 40,
//   },
// });
