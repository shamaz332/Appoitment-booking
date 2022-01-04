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
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "http://192.168.8.101:5000/api/users/usersList"
        );
        setFilteredData(response);
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleSearch = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    let result = [];
    console.log(value);
    result = data.filter((da) => {
      return da.username.search(value) != -1;
    });
    setFilteredData(result);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Input placeholder="Search sellers" />
        <TextInput onChange={(e) => handleSearch(e)} />
        {filteredData.map((value) => {
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
