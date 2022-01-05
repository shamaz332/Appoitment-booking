import {
  Button,
  Layout,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Card, Input, Text } from "react-native-elements";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

export default function ({ navigation, route }) {
  const { isDarkmode, setTheme } = useTheme();
  const userParams = route.params.params;
  const [user, setUser] = useState(route.params.params.user);
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);

  // This is to manage TextInput State
  const [inputValue, setInputValue] = useState("");
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
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
          <Card.Title> Name: {user.username} </Card.Title>{" "}
          <Card.Title> Email: {user.email} </Card.Title>{" "}
          <Card.Title> Available Slots: </Card.Title> <hr />{" "}
          {user.slots.map(({ availability }) => {
            return (
              <View key={availability}>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: "20px",
                  }}
                >
                  {" "}
                  {availability}{" "}
                </Text>{" "}
                <Button
                  onPress={toggleModalVisibility}
                  text="Book Appointment"
                  style={{
                    marginTop: 10,
                    marginRight: 10,
                  }}
                />{" "}
              </View>
            );
          })}{" "}
        </Card>{" "}
        <Modal
          animationType="slide"
          transparent
          visible={isModalVisible}
          presentationStyle="overFullScreen"
          onDismiss={toggleModalVisibility}
        >
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <TextInput
                placeholder="Enter something..."
                value={inputValue}
                style={styles.textInput}
                onChangeText={(value) => setInputValue(value)}
              />

              {/** This button is responsible to close the modal */}
              <Button title="Close" onPress={toggleModalVisibility} />
            </View>
          </View>
        </Modal>
      </View>{" "}
    </Layout>
  );
}

// These are user defined styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
});
