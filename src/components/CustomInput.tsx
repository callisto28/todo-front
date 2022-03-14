import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import React, { useState } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: (value: string) => void;
  titleText: string;
  error?: any;
  errorDetails?: string;
}

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  onChangeText,
  titleText,
  error,
  errorDetails,
}: Props) => {
  return (
    <View style={styles.inputView}>
      {!!titleText && (
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
      )}

      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        error={error}
      />
      {!!errorDetails && <Text style={styles.error}>{errorDetails}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 2,
    borderColor: "gray" ? "red" : "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#F1CB7B",
  },
  inputView: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  error: {
    color: "red",
    fontWeight: "500",
    marginBottom: 5,
  },
});

export default CustomInput;
