import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import { Container, Content, Thumbnail } from 'native-base';

export default class DayItem extends React.Component {
  render() {
    const weather = this.props.weather;
    console.log(this.props.img);
    return (
      <TouchableHighlight>
        <View style={styles.container}>
          <Image
            style={{
              backgroundColor: '#ccc',
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
            source={this.props.img}
          />
          <Thumbnail source={this.props.img} />
          <Text>
            {this.props.day}
            {'\n'}
            {weather.summary}
            {'\n'}
            {`low:${weather.temperatureLow}high:${weather.temperatureHigh}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    backgroundColor: 'blue',
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
