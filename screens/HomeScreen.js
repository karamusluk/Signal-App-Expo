import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getSession, destroySession } from "../helpers/session";
import { Button, Input, Image, Avatar } from "react-native-elements";
import CustomListItem from "../components/CustomListItem";

import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

import { getChats } from "../helpers/api";

const HomeScreen = ({ navigation }) => {
  const [session, setSession] = useState(null);
  const [chats, setChats] = useState([]);
  useLayoutEffect(() => {
    const get = async () => {
      const _session = await getSession();
      console.log("HomeScreen", _session);
      setSession(_session);
    };
    get();
  }, []);

  const setChatsFromAPI = () => {
    getChats().then((result) => {
      if (result) {
        setChats(result);
      } else {
        alert("No Chat Available");
      }
    });
  };

  useEffect(() => {
    setChatsFromAPI();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () =>
        session && (
          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity
              onPress={() =>
                destroySession().then(() => navigation.replace("Login"))
              }
            >
              <Avatar rounded source={{ uri: session?.imageUrl }} />
            </TouchableOpacity>
          </View>
        ),
      headerRight: () =>
        session && (
          <View style={styles.headerRight}>
            <TouchableOpacity activeOpacity={0.5}>
              <AntDesign name="camerao" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate({
                  name: "AddChat",
                  params: { refresh: setChatsFromAPI },
                })
              }
              activeOpacity={0.5}
            >
              <SimpleLineIcons
                name="pencil"
                size={20}
                color="black"
                style={styles.pencilIcon}
              />
            </TouchableOpacity>
          </View>
        ),
    });
  }, [navigation, session]);

  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map((chat) => (
          <CustomListItem key={chat.id} chat={chat} />
        ))}

        {/* <Button
          containerStyle={styles.button}
          onPress={() => {
            destroySession().then(() => {
              setSession("");
              navigation.replace("Login");
            });
          }}
          title="Sign Out"
          type="clear"
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

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

  headerRight: {
    flexDirection: "row",
    justifyContent: "center",
    width: 80,
    marginRight: 10,
  },

  pencilIcon: {
    marginLeft: 15,
  },
});
