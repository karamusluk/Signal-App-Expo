import React, { useState, useLayoutEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";

import { register } from "../helpers/api";

const RegisterScreen = ({ navigation, route }) => {
  const [fullname, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const pageTitle = route?.params?.title || "Sign Up";
  const [taskRunning, setTaskRunning] = useState(false);

  useLayoutEffect(() => {
    const settings = {};
    if (fullname !== "") {
      settings.title = `Let's ${pageTitle}, ${fullname.split(" ")[0]}!`;
    } else {
      settings.title = pageTitle;
    }
    settings.headerRight = () => {
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#fff"
      />;
    };
    navigation.setOptions(settings);
  }, [navigation, fullname]);

  const registerUser = async () => {
    setTaskRunning(true);

    try {
      let response = await register(
        fullname,
        username,
        email,
        password,
        imageUrl
      );
      if (response.error) {
        let message = "";
        if (typeof response.message === "object") {
          for (const key in response.message) {
            message += `${response.message[key]}\n`;
          }
        } else {
          message = response.message;
        }
        alert(message);
      }
      console.log(response);
      setTaskRunning(false);
    } catch (error) {
      setTaskRunning(false);
    }
  };
  return (
    <View behavior="padding" style={styles.container}>
      <StatusBar style={"light"} />

      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={fullname}
          onChangeText={(text) => setFullName(text)}
        />
        <Input
          placeholder="Username"
          autoCapitalize="none"
          type="text"
          value={username}
          onChangeText={(text) => setUserName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture Url"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={registerUser}
        />
      </View>

      <Button
        loading={taskRunning}
        containerStyle={styles.button}
        onPress={registerUser}
        title="Register"
        raised
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
