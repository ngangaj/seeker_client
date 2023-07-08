import React from "react";
import { Linking, StyleSheet, ToastAndroid, View } from "react-native";

import colors from "../config/colors";
import Icon from "../components/Icon";
import Button from "../components/Button";

function ContactMe({ user, setModalVisible, type }) {
  const ToasGravity = (txt) => {
    ToastAndroid.showWithGravity(txt, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };
  const toast = (txt) => {
    ToastAndroid.show(txt, ToastAndroid.SHORT);
  };

  return (
    <View style={type == "reverse" ? styles.modalReverse : styles.modal}>
      <Icon
        name="message-text"
        backgroundColor="blue"
        onPress={() => {
          Linking.openURL(`sms:&address=0${user.phone}`).catch((err) =>
            ToasGravity("Messages service is unavailable.")
          ),
            setModalVisible(false);
          toast("Opening Messages ...");
        }}
        size={type ? 40 : 70}
      />
      <Icon
        name="whatsapp"
        backgroundColor="green"
        //"whatsapp://send?text=" +this.state.message +"&phone=91" +this.state.mobileNo;
        onPress={() => {
          Linking.openURL(
            `whatsapp://send?text=Hi from Seeker.I would like your sevice&phone=2540${user.phone.toString()}`
          ).catch((err) => ToasGravity("Whatsapp service is unavailable."));
          setModalVisible(false);
          toast("Opening Whatsapp messanger ...");
        }}
        size={type ? 40 : 70}
      />
      <Icon
        name="phone"
        backgroundColor="green"
        onPress={() => {
          Linking.openURL(`tel:+254${user.phone}`).catch((err) =>
            ToasGravity("Phone service is unavailable.")
          ),
            setModalVisible(false);
          toast("Opening Dialer ...");
        }}
        size={type ? 40 : 70}
      />
      <Icon
        name="gmail"
        backgroundColor="#bf211e"
        onPress={() => {
          Linking.openURL(`mailto:${user.email}`).catch((err) =>
            ToasGravity("Mail service is unavailable.")
          ),
            setModalVisible(false);
          toast("Opening Mail client ...");
        }}
        size={type ? 40 : 70}
      />

      {type == "reverse" ? (
        <View>
          <Icon name="close" onPress={() => setModalVisible(false)} />
        </View>
      ) : (
        <View style={styles.closeButton}>
          <Button title="close" onPress={() => setModalVisible(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    bottom: "20%",
    width: "60%",
    height: 50,
    alignContent: "center",
  },
  modal: {
    position: "absolute",
    backgroundColor: colors.white,
    // height: "30%",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "98%",
    flexWrap: "wrap",
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    alignSelf: "center",
    paddingVertical: 20,
  },
  modalReverse: {
    // top: 5,
    position: "absolute",
    right: 5,
    height: "100%",
    paddingVertical: 5,
    justifyContent: "space-evenly",
  },
});
export default ContactMe;
