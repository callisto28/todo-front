import { View, Text } from "react-native";
import React from "react";

const CustomTextInput = ({ titleText = "" }) => {
  return (
    <View>
      <Text
        style={{
          fontStyle: "italic",
          color: "#fff",
          paddingHorizontal: 2,
          paddingBottom: 5,
        }}
      >
        {titleText}
      </Text>
    </View>
  );
};

export default CustomTextInput;
