import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "../components/Screen";

function miniMemberView(props) {
  return (
    <Screen style={styles.container}>
      <View style={styles.memberView}>
        <FlatList
          data={members}
          keyExtractor={(member) => member._id.toString()}
          ListHeaderComponent={() => (
            <View
              style={{
                alignSelf: "center",
                borderBottomWidth: 1,
              }}
            >
              <Text style={{ fontSize: 22, color: colors.medium }}>
                Control visibility of providers.
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <>
              <ListItem
                key={item.phone}
                image={item.image}
                title={item.userName}
                subTitle={"approved: " + item.approved}
              />
              <View
                style={{
                  width: "50%",
                  alignSelf: "center",
                  height: 20,
                  justifyContent: "center",
                  backgroundColor: "blue",
                }}
              >
                <Button
                  title={item.approved ? "disapprove" : "approve"}
                  onPress={() => handleApproval(item)}
                  color="secondary"
                />
              </View>
            </>
          )}
        />
        <Button
          title="close"
          onPress={() => {
            setMemberVisible(false);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});
export default miniMemberView;
