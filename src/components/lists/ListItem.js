import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  style,
  subTitleColor,
  onDoublePress,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight
        underlayColor={colors.light}
        onPress={onPress}
        onDoublePress={onDoublePress}
      >
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && <Image style={styles.image} source={{ uri: image }} />}
          <View style={styles.detailsContainer}>
            {title && (
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            )}
            {subTitle && (
              <Text style={[styles.subTitle, subTitleColor]} numberOfLines={2}>
                {subTitle}
              </Text>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
    marginBottom: 15,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  subTitle: {
    color: colors.secondary,
  },
  title: {
    fontWeight: "500",
  },
});

export default ListItem;
