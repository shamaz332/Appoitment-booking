import {
  Button,
  Layout,
  Section,
  SectionContent,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Card, Input, Text } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  const [data, setData] = useState([]);
  const [filteredText, setFilteredText] = useState(data);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://localhost:5000/api/users/usersList"
        );
        setData(response);
        setFilteredText(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const searchFilterFunction = (text) => {
    if (text === "" || !text) {
      setFilteredText(data);
      setSearch(text);
    } else if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.username
          ? item.username.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        console.log(itemData);
        return itemData.indexOf(textData) > -1;
      });
      setFilteredText(newData);
      setSearch(text);
    } else {
      setData(data);
      setSearch(text);
    }
  };
  return (
    <Layout>
      <TopNav
        middleContent="Home"
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
        <Section>
          <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
              <Input
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                placeholder="Search sellers"
              />
              {filteredText.map((value) => {
                return (
                  <View key={value._id} style={{ width: "100%" }}>
                    <Card>
                      <Card.Title>{value.username}</Card.Title>
                      <Button
                        text="Book"
                        onPress={() =>
                          navigation.navigate('SecondScreen', {
                           
                            user: value ,
                          })
                        }
                        style={{
                          marginTop: 10,
                        }}
                      />
                    </Card>
                  </View>
                );
              })}
            </ScrollView>
          </SafeAreaView>
        </Section>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 20,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  text: {
    fontSize: 42,
  },
});

// export default FetchALLSellers;
