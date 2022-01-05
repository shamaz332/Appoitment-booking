import { Button, Card, Input, Text } from "react-native-elements";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import axios from "axios";

const FetchALLSellers = () => {
  const [data, setData] = useState([]);
  const [filteredText, setFilteredText] = useState(data);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://192.168.8.101:5000/api/users/usersList"
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
                  title="Book Appointment"
                  buttonStyle={{
                    backgroundColor: "rgba(78, 116, 289, 1)",
                    borderRadius: 3,
                  }}
                  containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                  }}
                />
              </Card>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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

export default FetchALLSellers;
