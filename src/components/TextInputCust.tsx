import React, { useState } from "react";

import { Controller } from "react-hook-form";
import { View, StyleSheet } from "react-native";
import { HelperText, TextInput, useTheme } from "react-native-paper";

const ControlledInput = ({ control, rules, name, type, ...props }: any) => {
  const [hidden, setHidden] = useState(true);
  const { colors } = useTheme();
  return (
    <View style={styles.inputView}>
      <Controller
        control={control}
        rules={
          type === "email"
            ? {
                pattern: {
                  value:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: "email invalide",
                },
                ...rules,
              }
            : rules
        }
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoComplete={"off"}
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            secureTextEntry={type === "password" && hidden}
            right={
              type === "password" && (
                <TextInput.Icon
                  icon={hidden ? "eye" : "eye-off"}
                  size={25}
                  style={styles.icon}
                  color={colors.primary}
                  onPress={() => setHidden(!hidden)}
                />
              )
            }
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
            {...props}
          />
        )}
      />
      {props.error && (
        <HelperText type="error" visible={props.error}>
          {props.error.message}
        </HelperText>
      )}
    </View>
  );
};

export default ControlledInput;

const styles = StyleSheet.create({
  inputView: {
    // paddingBottom: 8,
    borderRadius: 15,

    borderWidth: 3,
  },
  error: {
    color: "red",
    fontWeight: "500",
    marginBottom: 5,
  },
});
