import {
  Button,
  Layout,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Card, Input, Text } from "react-native-elements";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function ({ navigation, route }) {
  const { isDarkmode, setTheme } = useTheme();
  const userParams = route.params.params;
  const [user, setUser] = useState(route.params.params.user);
  const a = () => {
    console.log(userParams);
  };
  return (
    <Layout>
      <TopNav
        middleContent="Book Appointment"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card>
          <Card.Title>Name : {user.username}</Card.Title>
          <Card.Title>Email : {user.email}</Card.Title>
          <Card.Title>Available Slots : </Card.Title>
          <hr />
          {user.slots.map(({ availability }) => {
            return (
              <View key={availability}>
                <Text style={{ fontWeight: "400", fontSize: "20px" }}>
                  {availability}
                </Text>
                <Button
                  text="Book Appointment"
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                  }}
                />
              </View>
            );
          })}
        </Card>
      </View>
    </Layout>
  );
}
