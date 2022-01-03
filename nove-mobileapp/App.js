import * as React from 'react';

import { SceneMap, TabView } from 'react-native-tab-view';
import { View, useWindowDimensions } from 'react-native';

import FetchALLSellers from './components/fetchALLSellers';

const renderScene = SceneMap({
  first: FetchALLSellers,
  second: FetchALLSellers,
});

export default function App() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All Sellers' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}