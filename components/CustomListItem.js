import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { getSession } from "../helpers/session";

const CustomListItem = ({ chat, enterChat }) => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const get = async () => {
      const _session = await getSession();
      console.log(_session);
      setSession(_session);
    };
    get();
  }, []);

  return (
    session && (
      <ListItem key={chat.id} bottomDivider>
        <Avatar rounded source={{ uri: session?.imageUrl }} />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            {chat?.name}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chat?.name}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
