import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";

import navigationTheme from "./src/navigation/navigationTheme";
import AppNavigator from "./src/navigation/AppNavigator";
import AboutNavigator from "./src/navigation/AboutNavigator";
import AuthContext from "./src/auth/context";
import authStorage from "./src/auth/storage";
import { navigationRef } from "./src/navigation/rootNavigation";
import ServiceNavigator from "./src/navigation/ServiceNavigator";
import AccountNavigator from "./src/navigation/AccountNavigator";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) return;
    setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser()}
        onFinish={() => setIsReady(true)}
        onError={() => console.warn}
      />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// import Members from "./src/screens/Members";
// import Profile from "./src/screens/Profile";
// import ProviderProfile from "./src/screens/ProviderProfile";
// import Welcome from "./src/screens/Welcome";
// import Register from "./src/screens/Register";
// import CreateService from "./src/screens/CreateService";
// import About from "./src/screens/About";

// export default function App() {
//   return <ServiceNavigator />;
// }

// // import React, { Component } from "react";
// // import {
// //   View,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   Button,
// //   Linking,
// // } from "react-native";

// // export default class App extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       mobileNo: "",
// //       message: "",
// //     };
// //   }
// //   openWhatsApp = () => {
// //     const num = 712549474;
// //     console.log(
// //       `whatsapp://send?text="Hi from Seeker.I would like your sevice".$phone=+254${
// //         0 + num.toString()
// //       }`
// //     );
// //     let msg = this.state.message;
// //     let mobile = this.state.mobileNo;
// //     if (mobile) {
// //       if (msg) {
// //         let url =
// //           "whatsapp://send?text=" +
// //           this.state.message +
// //           "&phone=254" +
// //           this.state.mobileNo;
// //         Linking.openURL(url)
// //           .then((data) => {
// //             console.log("WhatsApp Opened successfully " + data);
// //           })
// //           .catch(() => {
// //             alert("Make sure WhatsApp installed on your device");
// //           });
// //       } else {
// //         alert("Please enter message to send");
// //       }
// //     } else {
// //       alert("Please enter mobile no");
// //     }
// //   };
// //   render() {
// //     return (
// //       <View style={styles.container}>
// //         <Text
// //           style={{ textAlign: "center", fontSize: 20, paddingVertical: 30 }}
// //         >
// //           Open WhatsApp chat box from React-native App
// //         </Text>

// //         <TextInput
// //           value={this.state.message}
// //           onChangeText={(message) => this.setState({ message })}
// //           placeholder={"Enter message"}
// //           multiline={true}
// //           style={[styles.input, { height: 90 }]}
// //         />

// //         <TextInput
// //           value={this.state.mobileNo}
// //           onChangeText={(mobileNo) => this.setState({ mobileNo })}
// //           placeholder={"Enter Mobile"}
// //           style={styles.input}
// //           keyboardType={"numeric"}
// //         />
// //         <View style={{ marginTop: 20 }}>
// //           <Button onPress={this.openWhatsApp} title="Open WhatsApp message" />
// //         </View>
// //       </View>
// //     );
// //   }
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //     padding: 30,
// //     backgroundColor: "#ffffff",
// //   },
// //   input: {
// //     width: 255,
// //     height: 44,
// //     padding: 10,
// //     margin: 10,
// //     backgroundColor: "#FFF",
// //     borderColor: "#000",
// //     borderRadius: 0.5,
// //     borderWidth: 0.5,
// //   },
// // });
