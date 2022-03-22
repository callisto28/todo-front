import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/HomeScreen/HomeScreen";
import Register from "../screens/Authentification/RegisterScreen";
import Login from "../screens/Authentification/LoginScreen";
import TodoScreen from "../screens/TodoScreen/TodoScreen";
import TodoListScreen from "../screens/TodoScreen/TodoListScreen";
import { useSelector } from "react-redux";
import { LocalRootState } from "../api/store/reducers/user.reducer";
import { Button } from "react-native-paper";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const isLogin = useSelector(
    (state: LocalRootState) => state.user?.access_token
  );

  return (
    <Stack.Navigator>
      {!isLogin ? (
        <Stack.Group>
          <Stack.Screen
            name="Accueil Todo"
            component={Home}
            options={{
              title: "Todo",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Créer un compte",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Se connecter",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name="TodoScreen"
            component={TodoScreen}
            options={{
              title: "Ajouter une tâche",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
          <Stack.Screen
            name="TodoListScreen"
            component={TodoListScreen}
            options={{
              title: "Liste de mes tâches",
              headerTitleAlign: "center",
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black",
              },
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
