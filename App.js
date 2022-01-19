import React, { useState } from "react";
import { AppNavigator } from "./src/infrastructure/navigation/app.navigator";
import { SafeArea } from './src/utility/safe-area-component'
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text } from 'react-native'

import { AsyncDataContextProvider } from "./src/services/async-info/asyncdata.context";

export default function App() {
  return (
    <AsyncDataContextProvider>
      <AppNavigator />
    </AsyncDataContextProvider>

  )

}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#ff8e50",
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
});




const slides = [
  {
    key: 'one',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    backgroundColor: '#ff8e50',
  },
  {
    key: 'two',
    title: 'Title 2',
    text: 'Other cool stuff',
    backgroundColor: '#febe29',
  },
  {
    key: 'three',
    title: 'Rocket guy',
    text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
    backgroundColor: '#22bcb5',
  }
];
