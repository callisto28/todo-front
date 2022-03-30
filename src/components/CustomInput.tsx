import { TextInput as PaperInput, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import React, { useState } from "react";

interface Props {
  value: string;
  type?: string;
  onChangeText: (text: string) => void;
  setValue: (value: string) => void;
  onFocus?: () => void;
  label: string;
  onBlur?: () => void;
  error?: boolean | string;
  secureTextEntry?: boolean;
}

const CustomInput = ({ value, type, label, setValue, onBlur }: Props) => {
  const [hidden, setHidden] = useState(true);
  const { colors } = useTheme();

  return (
    <View>
      <PaperInput
        autoComplete={"off"}
        theme={{
          roundness: 15,
          colors: {
            primary: "#3ADCFE",
            placeholder: "#fff",
            background: "#000",
            text: "#fff",
            surface: "blue",
          },
        }}
        label={label}
        onBlur={onBlur}
        mode="outlined"
        secureTextEntry={type === "password"}
        value={value}
        onChangeText={(text) => setValue(text)}
        right={
          type === "password" && (
            <PaperInput.Icon
              icon={hidden ? "eye" : "eye-off"}
              size={25}
              style={styles.icon}
              color={colors.primary}
              onPress={() => setHidden(!hidden)}
            />
          )
        }
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  // inputView: {
  //   borderRadius: 15,
  //   borderWidth: 3,
  // },
  // error: {
  //   color: "red",
  //   fontWeight: "500",
  //   marginBottom: 5,
  // },
});
