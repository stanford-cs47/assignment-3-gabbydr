/*
*
* Assignment 3
* Starter Files
*
* CS47
* Oct, 2018
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, SafeAreaView, View, FlatList, Text, Linking, Dimensions } from 'react-native'
import { material } from 'react-native-typography' //consider using this!
import { Metrics, Colors } from '../Themes'

export default class News extends Component {
  static defaultProps = { articles: [] }

  static propTypes = {
    articles: PropTypes.array
  }

  renderArticles = (item) => (
    <News
      title={item.title}
      content={item.snippet}
      author={item.byline}
      url={item.url}
      />
  )

  //you can change the props above to whatever you want/need.

  render () {
    const {articles} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <View style = {styles.article}>
              <Text style={material.headline}>{item.title}</Text>
              <Text style={material.body1}>{item.snippet}</Text>
              <Text style={material.body2}>{item.byline}</Text>
              <Text style={material.caption}>{item.date}</Text>
              <Text style={material.caption}>{item.url}</Text>
            </View>
          )}
          keyExtractor={item => item.url}
          >
          </FlatList>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    height: height * .8,
    width: width,
    paddingTop: 30
  },
  article: {
    height: height * .3,
    width: width,
    padding: 15
  },
  title: {
    fontSize: 25
  }
});
