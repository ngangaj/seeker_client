import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";
import extras from "../api/customerService";
import ActivityIndicator from "../components/ActivityIndicator";
import AppTextInput from "../components/TextInput";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import routes from "../navigation/routes";
import authApi from "../auth/useAuth";

function About({ navigation }) {
  const [message, setMessage] = useState("");

  const { logOut, user } = authApi();

  const handleSend = async () => {
    if (message.length < 10)
      return ToastAndroid.showWithGravity(
        "Message too short..",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    const response = await extras.sendConcern(message);

    if (response.ok) {
      alert("Message send success");
      setMessage("");
    } else {
      alert("Sorry, message not sent. Try again later.");
      setMessage("");
    }
  };
  return (
    <>
      <Screen>
        <ScrollView>
          <View style={styles.logoContainer}>
            <Image
              style={styles.image}
              source={require("../assets/service.png")}
            />
            <View style={styles.tagView}>
              <Text style={styles.tagline}>We Got You Fixed.</Text>
            </View>
          </View>

          <View style={styles.details}>
            {/* <View style={{ height: 120 }}> */}
            <Text style={styles.info}>
              The Seeker application aims at connecting various service
              providers to consumers. We aim at saving your time and effort
              involved in searching for these services with awesome integration
              with your favourite Social media platform.
            </Text>
            {/* </View> */}
            {/* <View style={{ height: 70 }}> */}
            <Text style={styles.enquiry}>
              For any enquiries, issues or concerns, feel free to write us
              below. Make sure to include your contacts for feedback kindly.
            </Text>
            {/* </View> */}
          </View>
          <KeyboardAvoidingView behavior="position">
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <AppTextInput
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Message..."
                multiline={true}
              />
            </View>
            <View style={{ position: "absolute", right: 0, bottom: 10 }}>
              <Icon name="send" onPress={handleSend} />
            </View>
          </KeyboardAvoidingView>
          {!user && (
            <ListItem
              // style={{ backgroundColor: colors.secondary }}
              title="Already an user? Login."
              onPress={() => navigation.navigate(routes.LOGIN)}
            />
          )}
          {!user && (
            <ListItem
              // style={{ backgroundColor: colors.secondary }}
              title="Register to provide a service."
              onPress={() => navigation.navigate(routes.REGISTER)}
            />
          )}
          {user && (
            <ListItem
              // style={{ backgroundColor: colors.secondary }}
              title="Logout "
              onPress={() => {
                logOut();
                navigation.navigate("Services");
              }}
            />
          )}
        </ScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    // backgroundColor: "red",
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    height: 200,
    marginBottom: 16,
    opacity: 2,
  },
  image: {
    height: 150,
    width: "100%",
    marginTop: 7,
  },
  tagView: {
    marginTop: 20,
    // backgroundColor: "pink",
    height: 30,
  },
  tagline: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.secondary,
  },
  info: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.medium,
    marginBottom: 20,
  },
  details: {
    paddingHorizontal: 10,
    textAlign: "justify",
  },
});

export default About;
