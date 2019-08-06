import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }


  render() {
    return (
      <View
        style={[styles.container, styles.card2, { backgroundColor: '#8781bd' }, flex = 1]}
      >
        <Text style={styles.title}>Welcome to SaveBot!</Text>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={text => {
            this.setState({
              email: text
            });
          }}
          placeholder="Email"
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={text => {
            this.setState({
              password: text
            });
          }}
          secureTextEntry={true}
          placeholder="Password"
          value={this.state.password}
        />






        <View style={{ flexDirection: 'row', marginTop: 170 }}>
          <View style={styles.viewCenter}>
            <View style={styles.myButton}>
              <TouchableOpacity onPress={() => {
                //console.log(this.state.email, this.state.password);
                fetch("http://192.168.1.79:3000/db/login", {
                  method: "POST",
                  redirect: "follow",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                  })
                })
                  .then(response => {
                    //console.log(response);
                    if (response.status !== 200) {
                      alert("login failed!");
                      throw "not logged in";
                    }

                    return response.json();
                  })
                  .then(responseJson => {
                    //console.log(responseJson);
                    //if (responseJson.username) {
                    //console.log("hi");



                    alert("success");
                    this.props.navigation.navigate("Main");


                    //}
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}>
                <Text style={{ fontFamily: 'Bradley Hand', fontSize: 20 }}>Log In!</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View  >
            <View style={styles.myButton}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Register");
              }}>
                <Text style={{ fontFamily: 'Bradley Hand', fontSize: 20 }}>Sign Up!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


      </View >
    );
  }
}

export default LoginScreen;
