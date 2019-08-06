import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

class SetTemplate extends React.Component {
  static navigationOptions = {
    title: "Custom your Templates"
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userID: ""
    };
  }

  componentDidMount() {
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
  }
  render() {
    return <Text>SetTemplate</Text>;
  }
}

export default SetTemplate;
