import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";

import { login } from "../helpers/api";
import { getSession } from "../helpers/session";
import { prettifyErrors } from "../helpers/helpers";
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [taskRunning, setTaskRunning] = useState(false);

  const [session, setSession] = useState(null);
  const getUserSession = async () => {
    const _session = await getSession();
    console.log("LoginScreen", _session);
    setSession(_session);
    if (_session !== null) navigation.replace("Home");
  };

  useLayoutEffect(() => {
    getUserSession();
  }, []);

  const signIn = async () => {
    setTaskRunning(true);
    try {
      let response = await login(username, password);
      console.log("resss", response);
      if (!response || response.error) {
        let message = prettifyErrors(response.message);
        alert(message);
        setTaskRunning(false);
        return;
      }
      navigation.replace("Home");
      // alert(response.message);
      // console.log("session :: ", await getSession());
    } catch (error) {
      alert(error);
      setTaskRunning(false);
    }
  };

  return (
    <View behavior="padding" style={styles.container}>
      <StatusBar style={"light"} />
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/480px-Signal-Logo.svg.png",
        }}
        style={styles.logo}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Username"
          autoFocus
          autoCapitalize="none"
          type="text"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button
        loading={taskRunning}
        containerStyle={styles.button}
        onPress={signIn}
        title="Login"
      />

      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        title="Sign Up"
        type="clear"
      />
      <View style={{ height: 50 }} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: { width: 200, height: 200 },
  inputContainer: {
    width: 300,
    marginTop: 10,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
