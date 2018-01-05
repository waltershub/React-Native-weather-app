import React from 'react';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import config from '../config/config.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//import AutoComplete from '../components/autocomplete.js';
import { SearchBar, Icon, Button } from 'react-native-elements';
import axios from 'axios';
const backround = require('../assets/images/backround3.gif');

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
    this.gotToDayLIst = this.gotToDayLIst.bind(this);
    this.goToDayListByCity = this.goToDayListByCity.bind(this);
    this.goToDayLIstBylatlon = this.goToDayLIstBylatlon.bind(this);
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
  gotToDayLIst() {
    if (this.state.submitButton === 'use your location') {
      this.goToDayLIstBylatlon();
    } else {
      this.goToDayListByCity();
    }
  }
  goToDayListByCity() {
    axios
      .get(
        `http://maps.googleapis.com/maps/api/geocode/json?address=${
          this.state.locationCity
        }&sensor=false`
      )
      .then(response => {
        console.log(response.data.results[0]['geometry']);
        const url = `https://api.darksky.net/forecast/${config.darkSkyKey}/${
          response.data.results[0]['geometry'].location.lat
        },${response.data.results[0]['geometry'].location.lng}`;

        console.log(url);
        axios.get(url).then(response => {
          this.props.navigation.navigate('dayList', { weather: response.data });
        });
      });
  }
  goToDayLIstBylatlon() {
    const url = `https://api.darksky.net/forecast/${config.darkSkyKey}/${
      this.state.locationCoords.longitude
    },${this.state.locationCoords.latitude}`;

    console.log(this.state.locationCoords);
    axios.get(url).then(response => {
      this.props.navigation.navigate('dayList', { weather: response.data });
    });
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let locationCoords = await Location.getCurrentPositionAsync({});
    this.setState({ locationCoords: locationCoords.coords });
  };

  render() {
    return (
      <View style={{ backgroundColor: '#00000', flex: 1 }}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Image
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          source={backround}
        />
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
            onPress={this.gotToDayLIst}
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
