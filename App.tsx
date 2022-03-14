import React, { useState } from "react";

import { Navigation } from "./src/components/Navigation";
import { StyleSheet } from "react-native";

export default function App() {
  return <Navigation />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
