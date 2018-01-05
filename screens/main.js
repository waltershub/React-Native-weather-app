import React from 'react';
import { Platform, Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import config from '../config/config.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import AutoComplete from '../components/autocomplete.js';
import { SearchBar, Icon, Button } from 'react-native-elements';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      locationCoords: {},
      locationCity: 'enter location',
      errorMessage: null,
      submitButton: 'use your location',
      icon: 'edit-location',
      history: [],
    };

    this.useCity = this.useCity.bind(this);
  }
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  useCity(locationCity) {
    console.log(locationCity);
    this.setState({ locationCity });

    if (locationCity !== '') {
      this.setState({ submitButton: 'use input city' });
      this.setState({ icon: 'location-city' });
    } else {
      this.setState({ submitButton: 'use your location' });
      this.setState({ icon: 'edit-location' });
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    console.log(this.state.location, config);
    return (
      <View style={styles.container}>
        <View style={{ paddingTop: 300 }}>
          <SearchBar
            containerStlye={{ borderWidth: 0 }}
            clearIcon
            round
            onChangeText={this.useCity}
            onClearText={() => this.setState({ submitButton: 'use your location' })}
            placeholder="enter your location"
          />

          <Button
            containerViewStyle={{ margin: 50 }}
            raised
            icon={{ name: this.state.icon }}
            title={this.state.submitButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
