import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Image } from "react-native-expo-image-cache";
import Button from "../components/Button";
import ContactMe from "../components/ContactMe";
import Icon from "../components/Icon";
import ListItem from "../components/lists/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";

function ProviderProfile({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [specialty, setSpecialty] = useState("Salonist");
  const [stars, setStars] = useState([]);
  const user = route.params.item;
  //   _id: "60795a5e53d4a50d283fdbda",
  //   approved: false,
  //   email: "john1@domain.com",
  //   image:
  //     "http://192.168.43.21:5000/assets/1618565724538IMG_20200124_110611.jpg_full.jpg",
  //   isAdmin: false,
  //   jobCategory: "60795c4253d4a50d283fdbde",
  //   phone: 707096000,
  //   rating: 4,
  //   userName: "john",
  //   workPlace: "fleelance",
  //   location: "Nakuru, pipeline",
  // });

  useEffect(() => {
    // setUser(userDetails)
    starsView();
  }, []);

  const starsView = () => {
    let count = [];
    let counter = 0;
    for (let x = 1; x <= user.rating; x++) {
      count.push(x);
    }
    setStars(count);
  };

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <View style={styles.user}>
          <Image
            tint="light"
            style={styles.image}
            //   preview={{ uri: thumbnailUrl }}
            uri={user.image}
          />
          <Text style={{ marginVertical: 10 }}>{user.userName}</Text>
          {/* <Text>{user.email}</Text> */}
        </View>
        <View style={styles.entries}>
          <Text>Located in: </Text>
          <Text>{user.location}</Text>
        </View>
        <View style={styles.entries}>
          <Text>Field: </Text>
          <Text>{route.params.category}</Text>
        </View>
        <View style={styles.entries}>
          <Text>Work station: </Text>
          <Text>{user.workPlace}</Text>
        </View>
        <View style={styles.entries}>
          <Text>Approved by: </Text>
          <Text>Seeker Organization Administration, (S.O.A company)</Text>
        </View>
        {stars.length > 0 && (
          <View style={styles.rating}>
            <Text>Rating </Text>
            <View
              style={{
                // backgroundColor: colors.dark,
                borderRadius: 10,
                flexDirection: "row",
                borderWidth: 1,
                flex: 1,
                borderLeftWidth: 0,
                flexGrow: -1,
              }}
            >
              {stars.map((star) => (
                <Icon
                  key={star}
                  name="star-circle-outline"
                  backgroundColor={colors.light}
                  iconColor={colors.dark}
                  size={50}
                />
              ))}
            </View>
          </View>
        )}

        <Button title="contact me" onPress={() => setModalVisible(true)} />

        {modalVisible && (
          <ContactMe user={user} setModalVisible={setModalVisible} />
        )}
      </ScrollView>
    </Screen>
  );
}

// sms, asap, call,mail

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },

  user: {
    alignItems: "center",
  },
  entries: {
    marginVertical: 7,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default ProviderProfile;
