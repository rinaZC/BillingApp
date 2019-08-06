import React from "react";
import { ImageBackground, Modal, Text, TouchableHighlight, View, Alert, TextInput } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";

class ManageBudgets extends React.Component {





  static navigationOptions = {
    title: "Manage Budgets"
  };
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      username: "",
      userID: "",
      budgetsArr: null,
      food: 0,
      necessity: 0,
      justForFun: 0,
      saving: 0,
      updateFail: false
    };

  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  componentDidMount() {

    setInterval(() => {
      fetch("http://192.168.1.79:3000/db/manageBudgets", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          //console.log(res);

          this.setState({
            userID: res.userID,
            food: res.array[0].food.toString(),
            necessity: res.array[0].necessity.toString(),
            justForFun: res.array[0].justForFun.toString(),
            saving: res.array[0].saving.toString(),

            budgetsArr: res.array
          });
        })
        .catch(err => {
          console.log(err);
        })
    }, 1000)
  }

  render() {
    return (
      <ImageBackground source={require('./image.jpg')} style={styles.containers}>
        <View>{this.state.updateFail ? <Text style={{ color: "red", fontFamily: "Bradley Hand", fontSize: 25 }}>Oops you can only update it after a week</Text> : <Text></Text>}</View>
        <Text style={styles.title}>Manage Your Budgets</Text>
        {this.state.budgetsArr ?
          <View>
            <Text style={styles.body}>Food  ${this.state.food} </Text>
            <Text style={styles.body}>Necessity  ${this.state.necessity}</Text>
            <Text style={styles.body}>Just for Fun  ${this.state.justForFun}</Text>
            <Text style={styles.body}>Weekly Saving ${this.state.saving}</Text>

          </View>
          : <Text>no data</Text>}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Manage Your Daily Budgets</Text>
              <Text style={styles.body}>Food Budget</Text>
              <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ food: text })}
                value={this.state.food ? this.state.food : 0}></TextInput>
              <Text style={styles.body}>Necessity Budget</Text>
              <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ necessity: text })}
                value={this.state.necessity ? this.state.necessity : 0}></TextInput>
              < Text style={styles.body}>JustForFun Budget</Text>
              <TextInput style={styles.textInput} onChangeText={(text) => this.setState({ justForFun: text })}
                value={this.state.justForFun ? this.state.justForFun : 0}></TextInput>
              <View style={styles.viewCenter}>
                {this.state.budgetsArr
                  ? <Button
                    buttonStyle={{
                      backgroundColor: '#87cefa',
                      borderRadius: 10
                    }}
                    title="Update"
                    style={styles.modalbutton}
                    onPress={() => {
                      // fetch("http://192.168.1.79:3000/db/manageBudgets", {
                      //   method: "POST",
                      //   redirect: "follow",
                      //   credentials: "include",
                      //   headers: {
                      //     "Content-Type": "application/json"
                      //   },
                      //   body: JSON.stringify({
                      //     food: parseInt(this.state.food),
                      //     necessity: parseInt(this.state.necessity),
                      //     justForFun: parseInt(this.state.justForFun)
                      //   })
                      // }).then(res => {
                      //   console.log("update");
                      //   alert("successfully updated")






                      // .then(() => { this.props.navigation.navigate("Main"); }

                      // )
                      this.setState({
                        modalVisible: false,
                        updateFail: true
                      })







                    }}>

                  </Button>
                  : <Button
                    buttonStyle={{
                      backgroundColor: '#87cefa',
                      borderRadius: 10
                    }}

                    title="Create"
                    style={styles.modalbutton}
                    onPress={() => {
                      fetch("http://192.168.1.79:3000/db/createBudgets", {
                        method: "POST",
                        redirect: "follow",
                        credentials: "include",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          food: parseInt(this.state.food),
                          necessity: parseInt(this.state.necessity),
                          justForFun: parseInt(this.state.justForFun)
                        })
                      }).then(res => res.json()).then(res => {
                        console.log("create", res);
                        //alert("successfully updated")

                      })


                      this.setModalVisible(!this.state.modalVisible);
                    }}>

                  </Button>}


                <Button
                  buttonStyle={{
                    backgroundColor: '#87ceeb',
                    borderRadius: 10
                  }} title="Cancel" style={styles.modalbutton} onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);


                  }}></Button>
              </View>
            </View>
          </View>
        </Modal >




        <Button
          buttonStyle={{
            backgroundColor: '#87ceeb',
            borderRadius: 10
          }}
          style={styles.button}
          title="Set Your Budget"
          onPress={() => {
            this.setModalVisible(true);
          }}>

        </Button>


      </ImageBackground >
    );
  }
}

export default ManageBudgets;
