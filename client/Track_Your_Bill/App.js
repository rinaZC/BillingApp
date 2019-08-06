import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import MainScreen from "./Screens/MainScreen";
import ViewToday from "./Screens/ViewToday";
import ManageBudgets from "./Screens/ManageBudgets";
import SetTemplate from "./Screens/SetTemplate";

// import { SCREENS } from "./constants";

const Navigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Main: MainScreen,
    ViewToday: ViewToday,
    ManageBudgets: ManageBudgets,
    SetTemplate: SetTemplate
  },
  { initialRouteName: "Login" }
);

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return <LoginScreen />;
//   }
// }

export default createAppContainer(Navigator);
//export default App;
