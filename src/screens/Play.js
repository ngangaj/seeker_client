import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import AppButton from "../components/Button";

function Play(props) {
  const [on, setOnn] = useState(false);
  return (
    <View>
      <AppButton title="on" onPress={() => setOnn(true)} />

      <Modal Visible={on} style={styles.modal}>
        <Text> nkdnvc nkdnvk njknf </Text>
        <AppButton title="on" onPress={() => setOnn(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    margin: 15,
    alignItems: undefined,
    justifyContent: undefined,
  },
});
export default Play;
