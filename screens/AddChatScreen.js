import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { createChat } from "../helpers/api";
import { prettifyErrors } from "../helpers/helpers";
import { getSession, getSessionUserId } from "../helpers/session";

const AddChatScreen = ({ navigation, route }) => {
  const [chatname, setChatName] = useState("");
  const [password, setPassword] = useState("");
  const [taskRunning, setTaskRunning] = useState(false);

  const [session, setSession] = useState(null);
  useLayoutEffect(() => {
    const get = async () => {
      const _session = await getSession();
      console.log("HomeScreen", _session);
      setSession(_session);
    };
    get();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new Chat",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
    });
  }, [navigation, session]);

  const createAChat = async () => {
    setTaskRunning(true);
    console.log(chatname);
    const result = await createChat(chatname, session?.id);
    if (!result?.error) {
      alert(result.message);
      if (route?.params?.refresh) route?.params?.refresh();
      navigation.goBack();
    } else {
      alert(prettifyErrors(result.message));
    }
    setTaskRunning(false);
  };

  return (
    <View style={styles.container}>
      <Input
        value={chatname}
        onChangeText={(text) => setChatName(text)}
        placeholder="Enter a Chat Name"
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
        onSubmitEditing={createAChat}
        editable={!taskRunning}
      />
      <Button
        containerStyle={styles.button}
        onPress={createAChat}
        title="Create new Chat"
        type="clear"
        loading={taskRunning}
      />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 30,
    height: "100%",
    backgroundColor: "white",
  },
  button: {},
});
