import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { SearchBar, Icon, Button, Header } from 'react-native-elements';
import axios from 'axios';
import config from '../config/config.js';
import moment from 'moment';
export default class Daylist extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   type: this.props.navigation.state.params.type,
    //   location: this.props.navigation.state.params.location,
    // };
  }

  componentWillMount() {}
  render() {
    const { daily } = this.props.navigation.state.params.weather;
    console.log('moment', moment(daily.data[0].time * 1000).format('dddd'));
    return (
      <View>
        <Header
          outerContainerStyles={{ height: 100 }}
          centerComponent={{ text: daily.data[0].summary, style: { color: '#fff' } }}
          backgroundColor="rgb(0,0,139)"
        />
        <Text> day </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
