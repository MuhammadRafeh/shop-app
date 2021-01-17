import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import ShopNavigator from "./navigation/ShopNavigator";
import store from "./redux/store";

import { useFonts } from 'expo-font';
import AppLoading from "expo-app-loading";

function App() {

  const [isFontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })

  if (!isFontsLoaded) {
    return <AppLoading /> 
  }
  
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}

export default App;
