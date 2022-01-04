import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import axios from 'axios';

const FetchALLSellers = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('http://192.168.8.101:5000/api/users/usersList');
        console.log(response)

        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };
    

    fetchData();
  }, []);

  return (
    <View>
      {Object.entries(data).map(([key, value]) => {
        <View>{value}</View>
    // Pretty straightforward - use key for the key and value for the value.
    // Just to clarify: unlike object destructuring, the parameter names don't matter here.
})}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default FetchALLSellers;