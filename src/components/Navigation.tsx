import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Authentification/HomeScreen/HomeScreen";
import Login from "../screens/Authentification/LoginScreen/LoginScreen";
import Register from "../screens/Authentification/RegisterScreen/RegisterScreen";
import TodoScreen from "../screens/TodoScreen/TodoScreen";
import TodoListScreen from "../screens/TodoScreen/TodoListScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  // const [isSignedIn, setisSignedIn] = useState(true);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const userToken = localStorage.getItem("token");
  //   if (userToken) {
  //     setisSignedIn(true);
  //   } else {
  //     setisSignedIn(false);
  //   }
  // }, []);

  return (
    // <>
    //   {loading ? <Home /> : null}
    //   {isSignedIn ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        <Stack.Screen name="TodoScreen" component={TodoScreen} />
        <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // ) : (
    //   <NavigationContainer>
    //     <Stack.Navigator
    //       screenOptions={{
    //         headerShown: false,
    //       }}
    //     >
    //       <Stack.Screen name="TodoScreen" component={TodoScreen} />
    //       <Stack.Screen name="TodoListScreen" component={TodoListScreen} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // )}
    // </>
  );
};
