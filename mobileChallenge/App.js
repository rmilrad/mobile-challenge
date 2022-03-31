import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  ItemSeparatorComponent,
  ItemSeperatorView,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
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

const URL = "http://universities.hipolabs.com/search?country=United+States";

const App = () => {

  {/* Define and initialize variables */}
  const [masterData, setmasterData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);
  const [search, setsearch] = useState('');

  useEffect(() => {
    fetchPosts();
    return () => {
    }
  }, []);

  {/* Fetch from API endpoint, save internally as JSON */}
  const fetchPosts = () => {
    fetch(URL)
    .then((response) => response.json())
    .then((responseJson) => {
      setfilteredData(responseJson);
      setmasterData(responseJson);
    }).catch((error) => {
      console.error(error);
    });
  }

  {/* Search filter for items in FlatList. If no school name is typed, return all results */}
  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData(masterData);
      setsearch(text);
    }
  }

  {/* Display properties for each item in requested API call */}
  const ItemView = ({item}) => {
    return (
      <View>
        <Text style={styles.description}>
          {item.name}{'. '}{item.country.toUpperCase()}
        </Text>
      </View>
    )
  }

  {/* Line separation between elements in FlatView */}
  const ItemSeperatorView = () => {
    return (
      <View 
        style={{height: 1, width: '100%', backgroundColor: '#c8c8c8'}}
      >
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardView}>
        
        {/* TextInput for user to search through list items */}
        <TextInput 
          style={styles.textInputStyle}
          value={search}
          placeholder='Enter university name to search'
          underlineColorAndroid='transparent'
          onChangeText={(text) => searchFilter(text)}
        />
        {/* FlatList for items requested from API */}
        <FlatList 
          data={filteredData}
          keyExtractor={({ id }, index) => id}
          ItemSeparatorComponent={ItemSeperatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

// style sheet
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: "white"
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
    margin: 5,
    padding: 10,
  },
  description: {
    color: "black",
    padding: 10
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
    color: "black"
  },
  cardBackground: { 
    backgroundColor: "#CCCCE5",
    borderRadius: 10,
    marginRight: 15,
    marginLeft: 15
  }, 
  cardView: {
    marginTop: 10
  }
});

export default App;