import { StyleSheet, View, Text } from "react-native";
// const styles = StyleSheet.create({
//   container: {

//     justifyContent: "center",
//     alignSelf: "center",
//     flex: 1
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   activeTitle: {
//     color: "red"
//   },
//   button: {
//     marginTop: 20,
//     marginBottom: 20,
//     textAlign: "center",
//     width: 200
//   },
//   modalbutton: {

//     marginTop: 20,
//     marginBottom: 20,
//     marginRight: 20,
//     //marginLeft: 20,

//     textAlign: "center",
//     width: 100


//   },
//   body: {
//     fontSize: 20,
//     marginEnd: 20
//   },
//   textInput: {
//     fontSize: 25,
//     textAlign: "center",
//     borderBottomWidth: 1,
//     marginLeft: 20,
//     marginRight: 20,
//     marginBottom: 20,
//     marginTop: 20


//   },
//   viewCenter: {
//     flexDirection: "row",
//     justifyContent: "center"
//   },
//   beautiful: { justifyContent: "space-around", flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1, marginBottom: 10, marginTop: 10 }

// });

const styles = StyleSheet.create({

  modalbutton: {

    marginTop: 20,
    marginBottom: 20,
    marginRight: 20,
    //marginLeft: 20,

    textAlign: "center",
    width: 100


  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    width: 200,
    borderRadius: 30,


  },
  colorx: {
    color: "#778899"

  },
  body: {
    fontSize: 25,
    marginEnd: 20,
    fontFamily: "Papyrus"
  },
  viewCenter: {
    flexDirection: "row",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'white',
  },
  containerx: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1

  },
  textInput: {
    fontSize: 25,
    textAlign: "center",
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,

  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 42,
    fontWeight: 'bold',
    opacity: 0.8,
    fontFamily: 'Bradley Hand'
  },
  containers: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  myButton: {
    marginLeft: 45,
    padding: 35,
    height: 120,
    width: 120,  //The Width must be the same as the height
    borderRadius: 250, //Then Make the Border Radius twice the size of width or Height   
    backgroundColor: 'rgb(195, 125, 198)',

  }
});

export default styles;
