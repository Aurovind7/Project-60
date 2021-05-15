import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SummaryScreen from './screens/SummaryScreen';
import AppHeader from './components/AppHeader';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <AppHeader />
        <AppContainer />
      </View>
    );
  }
}

var AppNavigator = createSwitchNavigator({
  HomeScreen: HomeScreen,
  SummaryScreen: SummaryScreen,
});
const AppContainer = createAppContainer(AppNavigator);
