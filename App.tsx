import React from "react";

import { Navigation } from "./src/navigation/Navigation";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import store, { persistor } from "./src/api/store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { LogBox } from "react-native";
import _ from "lodash";

LogBox.ignoreLogs(["Unhandled promise rejection:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Remote debugger is in a background") <= -1) {
    _console.warn(message);
  }
};

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
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <NavigationContainer>
          <Navigation />
          <StatusBar style="dark" />
        </NavigationContainer>
        {/* </PersistGate> */}
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
