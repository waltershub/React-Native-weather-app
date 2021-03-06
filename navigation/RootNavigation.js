import { Notifications } from 'expo';
import React from 'react';

import { StackNavigator } from 'react-navigation';

import Main from '../screens/main.js';
import dayList from '../screens/day-list.js';
import Detailed from '../screens/detailed.js';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: Main,
    },
    dayList: {
      screen: dayList,
    },
    detailed: {
      screen: Detailed,
    },
  },
  {
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: '#000000)',
        height: 5,
        borderBottomColor: '#000000',
      },
      statusBarStyle: 'light-content',
    }),
  }
);

export default class RootNavigator extends React.Component {
  constructor() {
    super();
    this.state = {
      drawOpen: false,
    };
    //
    // this.openDrawer = this.openDrawer.bind(this);
    // this.closeDrawer = this.closeDrawer.bind(this);
  }
  // openDrawer() {
  //   this.setState({ drawOpen: true });
  // }
  // closeDrawer() {
  //   this.setState({ drawOpen: false });
  // }

  componentDidMount() {
    //this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    //  this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }
}
