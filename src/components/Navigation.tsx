import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Authentification/HomeScreen/HomeScreen";
import Login from "../screens/Authentification/LoginScreen/LoginScreen";
import Register from "../screens/Authentification/RegisterScreen/RegisterScreen";
import TodoScreen from "../screens/TodoScreen/TodoScreen";
import TodoListScreen from "../screens/TodoScreen/TodoListScreen";
import { ActivityIndicator, View } from "react-native";
// import { AuthContext } from "../api/services/AuthUser";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState("");

  // const authContext = React.useMemo(() => {
  //   Login: () => {
  //     setUserToken("access-token");
  //     setIsLoading(false);
  //   };
  //   Register: () => {
  //     setUserToken("access-token");
  //     setIsLoading(false);
  //   };
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    // <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {/* {userToken === "" ? ( */}
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
      {/* ) : (
          
        )} */}
    </NavigationContainer>
    // </AuthContext.Provider>
  );
};
