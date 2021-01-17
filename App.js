import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import ShopNavigator from "./navigation/ShopNavigator";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <ShopNavigator/>
    </Provider>
  );
}

export default App;
