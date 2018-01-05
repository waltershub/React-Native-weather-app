import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { SearchBar, Icon, Button, Header } from 'react-native-elements';
import axios from 'axios';
import config from '../config/config.js';
import moment from 'moment';
import DayItem from '../components/dayItem.js';

const images = {
  'clear-day': require('../assets/images/PNG/clear-day.png'),
  'clear-night': require('../assets/images/PNG/clear-night.png'),
  'partly-cloudy-day': require('../assets/images/PNG/partly-cloudy-day.png'),
  'partly-cloudy-night': require('../assets/images/PNG/partly-cloudy-night.png'),
  cloudy: require('../assets/images/PNG/cloudy.png'),
  rain: require('../assets/images/PNG/rain.png'),
  sleet: require('../assets/images/PNG/sleet.png'),
  snow: require('../assets/images/PNG/snow.png'),
  wind: require('../assets/images/PNG/wind.png'),
  fog: require('../assets/images/PNG/fog.png'),
};

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
    console.log(images);
    return (
      <View style={styles.container}>
        <ScrollView style={{ height: '100%' }}>
          {daily.data.map(day => (
            <DayItem
              key={day.time}
              day={moment(day.time * 1000).format('dddd')}
              weather={day}
              img={images[day.icon]}
              navigate={this.props.navigation.navigate}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
