import React from "react";
import { ScrollView, ImageBackground, Modal, TextInput, View, Text, FlatList, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import styles from "./styles";

class ViewToday extends React.Component {
  static navigationOptions = {
    title: "View Today's Spendings"
  };
  constructor(props) {
    super(props);
    this.state = {
      // username: "",
      foodModalVisible: false,
      necessityModalVisible: false,
      justForFunModalVisible: false,
      userID: "",
      foods: [],
      foodTotal: 0,
      necessities: [],
      necessityTotal: 0,
      justForFuns: [],
      justForFunTotal: 0,
      title: "",
      amount: 0,
      foodBudget: null,
      necessityBudget: null,
      justForFunBudget: null,
      saving: 0

    };
  }

  // setModalVisible(visible) {
  //   this.setState({ modalVisible: visible });
  // }

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
            foodBudget: res.array[0].food,
            necessityBudget: res.array[0].necessity,
            justForFunBudget: res.array[0].justForFun,
            saving: res.array[0].saving


          });
        })
        .then(
          fetch("http://192.168.1.79:3000/db/spending", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => res.json()
          ).then(res => {
            //console.log("spending", res.spending);
            let foods = res.spending.filter(f => f.category == "food");
            let foodstotal = 0;
            foods.forEach(f => {
              foodstotal += f.amount;

            })
            let necessities = res.spending.filter(f => f.category == "necessity");
            let necessitytotal = 0;
            necessities.forEach(f => {
              necessitytotal += f.amount;

            })
            let justforfuns = res.spending.filter(f => f.category == "justForFun");
            let justforfuntotal = 0;
            justforfuns.forEach(f => {
              justforfuntotal += f.amount;

            })
            this.setState({
              foods: foods,
              foodTotal: foodstotal,
              necessities: necessities,
              necessityTotal: necessitytotal,
              justForFuns: justforfuns,
              justForFunTotal: justforfuntotal
            }
            )
          }).catch(err => {
            console.log(err)
          })

        ).catch(err => {
          console.log(err);
        })
    }, 1000)
  }

  onPressUpdate = (id) => {

  }

  onPressAdd = (categoryInput) => {
    fetch("http://192.168.1.79:3000/db/spending", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({

        category: categoryInput,
        title: this.state.title,
        amount: this.state.amount
      }),
      headers: {
        "Content-Type": "application/json"
      }

    }).then(res => res.json()).then(res => {
      console.log(res)
      //let newObj=res
      let saving = Math.round(this.state.saving - res.amount)
      fetch("http://192.168.1.79:3000/db/updateSaving", {
        method: "POST",
        redirect: "follow",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          saving: saving
        })
      }).then(res => {
        this.setState({
          saving: saving,
          title: "",
          amount: "",

        })




      }).then(() => {
        this.setState({
          foodModalVisible: false,
          necessityModalVisible: false,
          justForFunModalVisible: false
        })
      })
    }).catch(err => {
      console.log(err)
    })
  }



  //use modal instead
  render() {
    return (

      <ImageBackground source={require('./image9.jpg')} style={styles.containers}>
        <ScrollView>
          <Text style={styles.title}>View Today</Text>
          <Text style={styles.body}> Weekly Total Saving:{this.state.saving}</Text>

          {/* food */}

          <FlatList
            ListHeaderComponent={
              <View>
                <Text style={styles.title}>Food</Text>
                <View style={styles.beautiful}>
                  <Text style={styles.body}>food budget: {this.state.foodBudget}</Text>
                  <Text style={styles.body}>spent: {this.state.foodTotal}</Text>
                  <Text style={styles.body}>left:{this.state.foodBudget - this.state.foodTotal}</Text>

                </View>
              </View>}
            ListFooterComponent={
              <View style={styles.viewCenter}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  style={styles.button}
                  title="+Add a new Food Spending"
                  onPress={() => {
                    this.setState({
                      foodModalVisible: true
                    })

                  }}
                />

              </View>
            }
            data={this.state.foods}
            renderItem={({ item }) => (



              < TouchableOpacity style={styles.viewCenter} onPress={() => { this.onPressUpdate(item._id) }}>

                <Text style={styles.body}>{item.title}</Text>
                <Text style={styles.body}>{item.amount}</Text>

              </TouchableOpacity>



            )}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.foodModalVisible}
            style={styles.container}
          >
            <View style={styles.container}>

              <Text style={styles.title}>Record your food spending</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.title}
                placeholder="title"
                onChangeText={(e) => this.setState({
                  title: e
                })}
              />
              <TextInput
                style={styles.textInput}
                placeholder="price"
                value={this.state.amount.toString() ? 0 : this.state.amount.toString()}
                onChangeText={(e) => {
                  this.setState({
                    amount: e
                  })
                }}
              />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  onPress={() => {
                    this.onPressAdd("food")

                  }}
                  title="Save"
                  style={styles.modalbutton}
                />

                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  onPress={() => {
                    this.setState({
                      foodModalVisible: false
                    })
                  }}
                  title="Cancle"
                  style={styles.modalbutton}
                />

              </View>
            </View>
          </Modal>

          {/* necessities */}
          <FlatList
            ListHeaderComponent={
              <View>
                <Text style={styles.title}>Necessity</Text>
                <View style={styles.beautiful}>
                  <Text style={styles.body}>necessities budget: {this.state.necessityBudget}</Text>
                  <Text style={styles.body}>spent: {this.state.necessityTotal}</Text>
                  <Text style={styles.body}>left:{this.state.necessityBudget - this.state.necessityTotal}</Text>

                </View>
              </View>}
            ListFooterComponent={
              <View style={styles.viewCenter}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  style={styles.button}
                  title="+Add a new Necessity Spending"
                  onPress={() => {
                    this.setState({
                      necessityModalVisible: true
                    })

                  }}
                />

              </View>
            }
            data={this.state.necessities}
            renderItem={({ item }) => (



              < TouchableOpacity style={styles.viewCenter} onPress={() => { this.onPressUpdate(item._id) }}>

                <Text style={styles.body}>{item.title}</Text>
                <Text style={styles.body}>{item.amount}</Text>

              </TouchableOpacity>



            )}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.necessityModalVisible}
            style={styles.container}
          >
            <View style={styles.container}>

              <Text style={styles.title}>Record your Necessity spending</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.title}
                placeholder="title"
                onChangeText={(e) => this.setState({
                  title: e
                })}
              />
              <TextInput
                style={styles.textInput}
                placeholder="price"
                value={this.state.amount.toString() ? 0 : this.state.amount.toString()}
                onChangeText={(e) => {
                  this.setState({
                    amount: e
                  })
                }}
              />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  onPress={() => {
                    this.onPressAdd("necessity")
                    this.setState({
                      necessityModalVisible: false
                    })
                  }}
                  title="Save"
                  style={styles.modalbutton}
                />

                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  onPress={() => {
                    this.setState({
                      necessityModalVisible: false
                    })
                  }}
                  title="Cancle"
                  style={styles.modalbutton}
                />

              </View>
            </View>
          </Modal>
          <FlatList
            ListHeaderComponent={
              <View>
                <Text style={styles.title}>Just for Fun</Text>
                <View style={styles.beautiful}>
                  <Text style={styles.body}>justForFun budget: {this.state.justForFunBudget}</Text>
                  <Text style={styles.body}>spent: {this.state.justForFunTotal}</Text>
                  <Text style={styles.body}>left:{this.state.justForFunBudget - this.state.justForFunTotal}</Text>

                </View>
              </View>}
            ListFooterComponent={
              <View style={styles.viewCenter}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  style={styles.button}
                  title="+Add a new JustForFun Spending"
                  onPress={() => {
                    this.setState({
                      justForFunModalVisible: true
                    })

                  }}
                />

              </View>
            }
            data={this.state.justForFuns}
            renderItem={({ item }) => (



              < TouchableOpacity style={styles.viewCenter} onPress={() => { this.onPressUpdate(item._id) }}>

                <Text style={styles.body}>{item.title}</Text>
                <Text style={styles.body}>{item.amount}</Text>

              </TouchableOpacity>



            )}
          />
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.justForFunModalVisible}
            style={styles.container}
          >
            <View style={styles.container}>

              <Text style={styles.title}>Record your justForFun spending</Text>
              <TextInput
                style={styles.textInput}
                value={this.state.title}
                placeholder="title"
                onChangeText={(e) => this.setState({
                  title: e
                })}
              />
              <TextInput
                style={styles.textInput}
                placeholder="price"
                value={this.state.amount.toString() ? 0 : this.state.amount.toString()}
                onChangeText={(e) => {
                  this.setState({
                    amount: e
                  })
                }}
              />
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  onPress={() => {
                    this.onPressAdd("justForFun")
                    this.setState({
                      justForFunModalVisible: false
                    })
                  }}
                  title="Save"
                  style={styles.modalbutton}
                />

                <Button
                  buttonStyle={{
                    backgroundColor: '#87cefa',
                    borderRadius: 10
                  }}
                  onPress={() => {
                    this.setState({
                      justForFunModalVisible: false
                    })
                  }}
                  title="Cancle"
                  style={styles.modalbutton}
                />

              </View>
            </View>
          </Modal>
        </ScrollView>


      </ImageBackground >
    );
  }
}

export default ViewToday;
