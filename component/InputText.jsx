import { StyleSheet, TextInput, Dimensions, View } from "react-native";

export const InputText = ({
  keyboardTypes = "default",
  placeholder = "input",
  onChangeText,
  text,
  autoComplete = "off",
  autoCorrect = false,
  multiline = false,
  width = 0.8,
  opacity = 1,
  secureTextEntry = false,
  marginBottom = 20,
  marginTop = 0,
}) => {
  return (
    <View style={{ marginBottom, marginTop }}>
      <TextInput
        style={[
          styles.input,
          {
            width: Dimensions.get("window").width * width,
            maxWidth: 700,
            opacity: opacity,
          },
        ]}
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        keyboardType={keyboardTypes}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        placeholderTextColor="white"
        multiline={multiline}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: "#455855",
    color: "#FFFFFF",
    borderRadius: 30,
    height: 50,
    borderWidth: 0.5,
    shadowColor: "black",
    padding: 10,
  },
});
