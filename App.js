/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions,
  TextInput, Image, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import { Images, Colors } from './App/Themes'
import APIRequest from './App/Config/APIRequest'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import News from './App/Components/News'
import Search from './App/Components/Search'

export default class App extends React.Component {

  state = {
    loading: true,
    articles : [],
    searchText: '',
    category: ''
  }

  componentDidMount() {
    //uncomment this to run an API query!
    this.loadArticles();
  }

  async loadArticles(searchTerm = '', category = '') {
    this.setState({articles:[], loading: true});
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({loading: false, articles: resultArticles})
  }

  onChangeText = text => {
    this.setState({searchText: text});
  }

  searchArticles = () => {
    var articles = this.loadArticles(this.state.searchText);
    console.log("Article Results: ", articles);
  }

  renderArticles = (item) => (
    <News
      title={item.title}
      content={item.snippet}
      author={item.byline}
      url={item.url}
      />
  )

  keyExtractor = index => {
    return index.toString();
  }

  render() {
    const {articles, loading} = this.state;

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.titleBar}>
            <Image style={styles.logo}
              source={Images.logo}/>
          </View>

          <View style={styles.searchBarContainer}>

              <TextInput
                placeholder = "Search for News"
                style={styles.searchBar}
                onChangeText={text => this.onChangeText(text)}
                value={this.state.searchText}
                onSubmitEditing={() => this.searchArticles()}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={this.searchArticles}
                  >
                  <AntDesign name = "search1"
                    size={25}
                    color="red"
                    />
                </TouchableOpacity>
          </View>

          <News articles={this.state.articles}/>

          {/*And some news*/}

          {/*Though, you can style and organize these however you want! power to you 😎*/}

          {/*If you want to return custom stuff from the NYT API, checkout the APIRequest file!*/}

        </SafeAreaView>
      );
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  titleBar: {
    height: height * .09,
    width: width,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'

  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * .8,
    height: 40,
  },
  flatList: {
    height: height * .8,
    width: width,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignContent: 'flex-start'
  },
  logo: {
    height: height * .07,
    width: width * .92,
  },
  searchBar: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 2,
    width: width * .8,
    height: 40,
    backgroundColor: '#ededed',
    borderColor: '#ededed',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  search: {
    tintColor: 'red',
    height: 15,
    width: 15,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#ededed',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderColor: '#ededed',
    height: 40,
  }
});
