import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const URL = "https://my.api.mockaroo.com/users.json?page=1&count=40&key=930279b0";
// get data from this URL!

const App = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json.entries);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);
  // similar to 'componentDidMount', gets called once

  async function getMoviesAsync() {
    try {
      let response = await fetch(URL);
      let json = await response.json();
      setData(json.data);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }
 

  return (
    <SafeAreaView style={styles.container}>
      {/* While fetching show the indicator, else show response*/}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          {/* Display each movie */}
          <View style={{ borderBottomWidth: 10, marginBottom: 12 }}></View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>
                  {item.email}
                </Text>
              </View>
            )}
          />
        </View>
      )}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  listItem: {
    margin: 10,
    padding: 10
  }
});

export default App;
