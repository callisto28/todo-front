import React from "react";

import { Navigation } from "./src/navigation/Navigation";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import store from "./src/api/store/Store";

const DefaultThemes = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2E2E2E",
    accent: "#F5F5F5",
    text: "#fff",
    background: "#2E2E2E",
  },
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={DefaultThemes}>
        <NavigationContainer>
          <Navigation />
          <StatusBar style="dark" />
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
