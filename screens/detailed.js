import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { SearchBar, Icon, Button, Header, Tile } from 'react-native-elements';
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

export default class Detailed extends React.Component {
  render() {
    const { img } = this.props.navigation.state.params.weather;
    const { weather } = this.props.navigation.state.params;
    const { day } = this.props.navigation.state.params;
    const weatherArray = Object.keys(weather);
    return (
      <View style={styles.container}>
        <Tile imageSrc={images[weather.icon]} title={day} featured caption={weather.summary} />
        <ScrollView style={{ backgroundColor: '#000000' }}>
          {weatherArray.map((detail, i) => (
            <Text style={{ color: '#fff', fontSize: 20 }} key={i}>
              {detail}:{weather[detail]}
            </Text>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
});
