import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";

import Text from "./Text";
import colors from "../config/colors";

function Card({
  item,
  title,
  subTitle,
  imageUrl,
  thumbnailUrl,
  onPress,
  onLongPress,
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
      <View style={styles.card}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Image
          tint="light"
          style={styles.image}
          preview={{ uri: thumbnailUrl }}
          uri={imageUrl}
        />

        <View style={styles.detailsContainer}>
          <Text style={styles.subTitle} numberOfLines={2}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    borderBottomWidth: 1,
    // borderBottomColor: colors.primary,
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.medium,
    fontWeight: "bold",
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    position: "absolute",
    top: "20%",
    zIndex: 1,
    color: colors.white,
  },
});

export default Card;
