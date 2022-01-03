import { Text, TouchableOpacity, View } from 'react-native';

import axios from 'axios';

const FetchALLSellers = () => {
    const getAllUsers = () => {
        axios
        .get('https://jsonplaceholder.typicode.com/posts/1')
        .then(function (response) {
          // handle success
          alert(JSON.stringify(response.data));
        })
          .catch(function (error) {
            // handle error
            alert(error.message);
          })
          .finally(function () {
            // always executed
            alert('Finally called');
          });
      };
    
    return (
        <View>
              <TouchableOpacity
      
        onPress={getAllUsers}>
        <Text>Multiple Concurrent Requests In Single Call</Text>
      </TouchableOpacity>
        </View>
    )
}

export default FetchALLSellers
