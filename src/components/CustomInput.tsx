import { TextInput as PaperInput } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface Props {
  value: string;
  type?: string;
  onChangeText: (text: string) => void;
  setValue: (value: string) => void;
  onFocus: () => void;
  label: string;

  secureTextEntry?: boolean;
}

const CustomInput = ({ value, type, label, setValue }: Props) => {
  return (
    <View style={styles.inputView}>
      <PaperInput
        theme={{
          colors: {
            primary: "#3B71F3",
            placeholder: "white",
            background: "#2E2E2E",
            text: "#fff",
            surface: "#2E2E2E",
          },
        }}
        label={label}
        onFocus={() => {
          setValue(value);
        }}
        mode="outlined"
        secureTextEntry={type === "password"}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputView: {
    paddingBottom: 8,
  },
  error: {
    color: "red",
    fontWeight: "500",
    marginBottom: 5,
  },
});
