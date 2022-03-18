import React from "react";
import { View, StyleSheet, Image, useWindowDimensions } from "react-native";

export default function CustomLogo() {
  const { height } = useWindowDimensions();

  return (
    <View style={{ alignContent: "center" }}>
      <Image
        style={[styles.logo, { height: height * 0.5 }]}
        resizeMode="contain"
        source={{
          uri: "https://spng.subpng.com/20180425/fxw/kisspng-todoist-task-management-computer-software-task-man-errands-5ae001b4832652.4840867015246299405372.jpg",
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: "auto",
    maxWidth: 200,
    maxHeight: 200,
    borderRadius: 70,

    marginBottom: 40,
  },
});
