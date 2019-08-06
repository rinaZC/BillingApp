import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, TextInput } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles"
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';


class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: "Register"
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }
  render() {
    return (
      <View
        style={[styles.container, styles.card2, { backgroundColor: '#8781bd' }, flex = 1]}
      >
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => {
            this.setState({
              username: text
            });
          }}
          placeholder="Username"
          value={this.state.username}
        />
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
        <Text />
        <View style={styles.viewCenter}>
          <View style={styles.myButton}>
            <TouchableOpacity onPress={() => {
              console.log(this.state.email, this.state.password);
              fetch("http://192.168.1.79:3000/db/register", {
                method: "POST",
                redirect: "follow",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  username: this.state.username,
                  email: this.state.email,
                  password: this.state.password
                })
              })
                .then(response => {
                  return response.json();
                })
                .then(responseJson => {
                  console.log(responseJson);
                  if (responseJson.username) {
                    //console.log("hi");
                    alert("success");
                    this.props.navigation.navigate("Login");
                    //navigation.navigate(SCREENS.SWIPE);
                  } else {
                    alert("try change your email?!");
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }}>
              <Text style={{ fontFamily: 'Bradley Hand', fontSize: 20 }}>Sign Me Up!</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <Button
          style={{ width: "30%", alignSelf: "center" }}
          title="Sign Me Up"
          onPress={() => {
            console.log(this.state.email, this.state.password);
            fetch("http://192.168.1.79:3000/db/register", {
              method: "POST",
              redirect: "follow",
              credentials: "include",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
              })
            })
              .then(response => {
                return response.json();
              })
              .then(responseJson => {
                console.log(responseJson);
                if (responseJson.username) {
                  //console.log("hi");
                  alert("success");
                  this.props.navigation.navigate("Login");
                  //navigation.navigate(SCREENS.SWIPE);
                } else {
                  alert("try change your email?!");
                }
              })
              .catch(err => {
                console.log(err);
              });
          }}
        /> */}
      </View>
    );
  }
}

export default RegisterScreen;
