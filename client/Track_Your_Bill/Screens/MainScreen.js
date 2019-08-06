//import { createStackNavigator, createAppContainer } from "react-navigation";
import React from "react";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";

class MainScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userID: ""
    };
  }

  componentDidMount() {
    setInterval(() => {
      fetch("http://192.168.1.79:3000/db/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          this.setState({
            userID: res._id,
            username: res.username
          });
        })
        .catch(err => {
          console.log(err);
        });
    }, 1000)

  }

  render() {
    return (
      <ImageBackground source={require('./image2.jpg')} style={styles.containers}>
        <View >
          <Text style={[styles.title, { marginTop: 30 }]}>How are you, </Text>
          <Text style={[styles.title, { marginTop: 30 }]}> {this.state.username} ?</Text>
          <View style={styles.containerx}>


            <Button
              buttonStyle={{
                backgroundColor: '#add8e6',
                borderRadius: 10
              }}
              style={styles.button}
              title="View Today's Spendings"
              onPress={() => {
                this.props.navigation.navigate("ViewToday");
              }}
            />
            <Button
              buttonStyle={{
                backgroundColor: '#add8e6',
                borderRadius: 10
              }}
              style={styles.button}
              title="Manage Your Budgets"
              onPress={() => {
                this.props.navigation.navigate("ManageBudgets");
              }}
            />
            <Button
              buttonStyle={{
                backgroundColor: '#add8e6',
                borderRadius: 10
              }}

              style={styles.button}
              title="Log Out"
              onPress={() => {
                fetch("http://192.168.1.79:3000/db/logout", {
                  method: "GET",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json"
                  }
                }).then(res => {
                  this.props.navigation.navigate("Login");
                });
              }}
            />
          </View>

        </View>
      </ImageBackground>
    );
  }
}

export default MainScreen;
